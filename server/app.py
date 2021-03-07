from flask import Flask, request, session
import pandas as pd
import numpy as np
import json
import base64
import re
import cv2
import numpy as np
from annoy import AnnoyIndex


app = Flask(__name__)
app.secret_key = 'info'

# Loads the flows array
flows = np.load('flows.npy', allow_pickle=True)


# Converts a abse64 image string to a numpy image
def base64_img_to_np(img_str):
    dataUrlPattern = re.compile('data:image/png;base64,(.*)$')
    img_str = dataUrlPattern.match(img_str).group(1)
    flow_img = base64.b64decode(img_str)
    img_as_np = np.frombuffer(flow_img, dtype=np.uint8)
    return img_as_np


# Identifies corners in the flow
def get_corners_in_flow(flow_img):
    flow_as_np = base64_img_to_np(flow_img)
    im = cv2.imdecode(flow_as_np, flags=1)
    im = cv2.resize(im, (1024, 1024))
    imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im_inv = cv2.bitwise_not(imgray)
    ret, thresh = cv2.threshold(im_inv,127,255,0)

    img_t = thresh
    skel = np.zeros(thresh.shape, np.uint8)
    element = cv2.getStructuringElement(cv2.MORPH_CROSS, (3,3))
    while True:
        open = cv2.morphologyEx(img_t, cv2.MORPH_OPEN, element)
        temp = cv2.subtract(img_t, open)
        eroded = cv2.erode(img_t, element)
        skel = cv2.bitwise_or(skel,temp)
        img_t = eroded.copy()
        if cv2.countNonZero(img_t)==0:
            break
    skel = cv2.GaussianBlur(skel, (25, 25), cv2.BORDER_DEFAULT)

    num_vis_grps = session.get('num_vis_grps')
    canvas_dims = session.get('canvas_dims')
    min_dist = min(canvas_dims['width'], canvas_dims['height'])/8
    quality_measure = 0.3
    corners = cv2.goodFeaturesToTrack(skel, num_vis_grps, quality_measure, min_dist)

    if corners is None or len(corners) != num_vis_grps:
        return None, None
    else:
        corners = (np.int0(corners)/1024).reshape(-1, 2)
        corners_padded = corners.reshape(-1)
        corners_padded = np.pad(corners_padded, (0,500-len(corners_padded)))
        return corners.tolist(), corners_padded


# Gets closest flow from the user-drawn flow
def get_closest_flows(corners):
    u = AnnoyIndex(500, 'euclidean')
    u.load('flows.ann')
    closest_flow_indexes = u.get_nns_by_vector(corners, 5, search_k=-1, include_distances=False)
    closest_flows = []
    for index in closest_flow_indexes:
        points = np.array(u.get_item_vector(index))
        points = points[np.nonzero(points)[0]].reshape(-1, 2)
        closest_flows.append(points.tolist())
    num_vis_grps = session.get('num_vis_grps')
    for i in reversed(range(len(closest_flows))):
        closest_flow = closest_flows[i]
        if len(closest_flow) != num_vis_grps:
            del closest_flows[i]
    if len(closest_flows) > 0:
        return closest_flows
    else:
        return None


# Scales the points to the canvas size
def get_scaled_corners(corners):
    corners = np.array(corners)
    corners = corners.reshape(-1, 2)
    canvas_dims = session.get('canvas_dims')
    dims = np.array([[canvas_dims['width'], canvas_dims['height']]])
    return (corners*dims).tolist()


# Min-max normalization fo the rnakings
def normalize(z):
    z = np.array(z)
    max_val = max(z)
    min_val = min(z)
    return (z - min_val)/(max_val - min_val)


# Gives a ranking to see how uniformly spred the flow is
def get_uniformity(dragged_images, flow):
    if flow is not None:
        flow = np.array(flow)
        uniformity_scores = []
        for dragged_image in dragged_images:
            x = dragged_image['x']
            y = dragged_image['y']
            width = dragged_image['width']
            height = dragged_image['height']
            box_center = np.array([(x + width)/2, (y + height)/2])
            uniformity_score = np.std(abs(np.linalg.norm(flow - box_center, axis=1)), axis=0)
            uniformity_scores.append(uniformity_score)
        if len(uniformity_scores) > 0:
            squished_uniformity = normalize(uniformity_scores)
            return float(np.mean(squished_uniformity))
    return -1


# Gives a ranking to see if the flow is ovberlapping some dragged image
def get_overlapping(dragged_images, flow):
    if flow is not None:
        flow = np.array(flow)
        for dragged_image in dragged_images:
            x = dragged_image['x']
            y = dragged_image['y']
            width = dragged_image['width']
            height = dragged_image['height']
            for point in flow:
                if x < point[0] < x + width and y < point[1] < y + height:
                    return 1
    return 0


# Gives a ranking to see how far the flow is from the margins
def get_margins(flow):
    if flow is not None:
        flow = np.array(flow)
        canvas_dims = session.get('canvas_dims')
        dims = np.array([canvas_dims['width'], canvas_dims['height']])
        dist_from_margins = np.concatenate((dims - flow, flow), axis=1)
        min_margins = np.amin(dist_from_margins, axis=1)
        squished_margins = normalize(min_margins)
        margin_score = np.mean(squished_margins)
        return float(margin_score)
    return -1


# Takes in all the three rankings and gives an overall ranking
def get_overall_ranking(uniformity, overlapping, margins):
    alpha = 0.33
    beta = 0.33
    return (1-beta-alpha)*uniformity + alpha*overlapping + beta*margins


# Gets flows, when no points detecetd in user-drawn flow
def get_flows_for_empty_canvas(num_vg):
    match=[]
    for i, row in enumerate(flows):
        flow_arr = np.array(row[1:3]).reshape(-1, 2)
        if len(flow_arr) == num_vg:
            match.append(flow_arr.tolist())
    return match[:10]


@app.route('/')
def index():
    return '<h1>Infographics Generation</h1>'


@app.route('/visgrps/', methods=['POST', 'GET'])
def visgrps():
    if request.method == 'POST':
        # If API called

        data = json.loads(request.data.decode('utf-8'))
        num_vis_grps = data['numVisGrps']
        vis_grps_info = data['visGrpsInfo']
        session['num_vis_grps'] = num_vis_grps
        session['vis_grps_info'] = vis_grps_info
        return json.dumps({
            'numVisGrps': num_vis_grps,
            'visGrpsInfo': vis_grps_info,
            })
    elif request.method == 'GET':
        # Shows this on the page

        return json.dumps({
            'numVisGrps': session.get('num_vis_grps'),
            'visGrpsInfo': session.get('vis_grps_info'),
        })


@app.route('/layout/', methods=['POST', 'GET'])
def layout():
    if request.method == 'POST':
        # If API called

        # Get POST request from API call
        data = json.loads(request.data.decode('utf-8'))

        # Save canvas simensions in sessions
        session['canvas_dims'] = data['canvasDims']

        # Get dragged images and remove the image elements
        # to save space, as we don't need them right now
        dragged_images = data['draggedImages']
        for dragged_image in dragged_images:
            del dragged_image['img']
        # Save dragged image data in sesions
        session['dragged_images'] = dragged_images

        # Get corners and padded corners from the flow that user has drawn
        corners, corners_padded = get_corners_in_flow(data['flowImg'])

        if corners is not None:
            # If corners are detected from the user-drawn flow,
            # scale them to canvas size, and get closest flows
            corners = get_scaled_corners(corners)
            closest_flows = get_closest_flows(corners_padded)
            if closest_flows is not None:
                for i in range(len(closest_flows)):
                    closest_flows[i] = get_scaled_corners(closest_flows[i])
        else:
            # If corners are not detected, get all flows with same
            # number of visual groups as entered by the user and scale them
            closest_flows = get_flows_for_empty_canvas(session.get('num_vis_grps'))
            for i in range(len(closest_flows)):
                closest_flows[i] = get_scaled_corners(closest_flows[i])

        session['flow'] = corners
        session['closest_flows'] = closest_flows

        # Ranking of the closest flows
        closest_flow_rankings = []
        for closest_flow in closest_flows:
            uniformity = get_uniformity(dragged_images, closest_flow)
            overlapping = get_overlapping(dragged_images, closest_flow)
            margins = get_margins(closest_flow)
            overall_rank = get_overall_ranking(uniformity, overlapping, margins)
            closest_flow_rankings.append(overall_rank)

        sorting_indices = np.argsort(closest_flow_rankings)
        closest_flows = np.array(closest_flows)[sorting_indices].tolist()
        session["closest_flows"] = closest_flows

        # SVG string
        session['svg'] = open('vg.svg').read()

        return json.dumps({
            'flow': session.get('flow'),
            'closestFlows': session.get('closest_flows'),
            'svg': session.get('svg'),
            'numVisGrps': session.get('num_vis_grps'),
            'visGrpsInfo': session.get('vis_grps_info'),
        })
    elif request.method == 'GET':
        # Shows this on the page

        return json.dumps({
            'flow': session.get('flow'),
            'closestFlows': session.get('closest_flows'),
            'canvasDims': session.get('canvas_dims'),
            'draggedImages': session.get('dragged_images'),
            'svg': session.get('svg'),
            'numVisGrps': session.get('num_vis_grps'),
            'visGrpsInfo': session.get('vis_grps_info'),
        })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
