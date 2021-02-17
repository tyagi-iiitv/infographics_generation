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


def base64_to_npimg(img_str):
    dataUrlPattern = re.compile('data:image/png;base64,(.*)$')
    img_str = dataUrlPattern.match(img_str).group(1)
    flow_img = base64.b64decode(img_str)
    img_as_np = np.frombuffer(flow_img, dtype=np.uint8)
    return img_as_np


def get_corners_in_flow(flow_img):
    flow_as_np = base64_to_npimg(flow_img)
    im = cv2.imdecode(flow_as_np, flags=1)
    im = cv2.resize(im, (1024, 1024))
    imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im_inv = cv2.bitwise_not(imgray)
    ret,thresh = cv2.threshold(im_inv,127,255,0)

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
    skel = cv2.GaussianBlur(skel, (5,5), 0)

    num_vis_grps = int(session.get("num_vis_grps", 0))
    corners = cv2.goodFeaturesToTrack(skel, num_vis_grps, 0.2, 64)

    if corners is None or len(corners) != num_vis_grps:
        return None, None
    else:
        corners = (np.int0(corners)/1024).reshape(-1, 2)
        corners_padded = corners.reshape(-1)
        corners_padded = np.pad(corners_padded, (0,500-len(corners_padded)))
        return corners, corners_padded


def get_closest_flows(corners):
    u = AnnoyIndex(500, 'euclidean')
    u.load('flows.ann')
    closest_flow_indexes = u.get_nns_by_vector(corners, 4, search_k=-1, include_distances=False)
    closest_flows = []
    for index in closest_flow_indexes:
        points = np.array(u.get_item_vector(index))
        points = points[np.nonzero(points)[0]].reshape(-1, 2)
        closest_flows.append(points)
    return np.array(closest_flows)


def get_scaled_corners(corners):
    corners = corners.reshape(-1, 2)
    canvas_dims = session.get("canvas_dims")
    dims = np.array([canvas_dims['width'], canvas_dims['height']])
    return corners*dims


def get_uniformity(dragged_images, flow):
    uniformity_scores = []
    for dragged_image in dragged_images:
        x = dragged_image['x']
        y = dragged_image['y']
        width = dragged_image['width']
        height = dragged_image['height']
        box_center = np.array([(x+width)/2, (y + height)/2])
        mean_dist = np.mean(np.linalg.norm(flow - box_center, axis=1), axis=0)
        uniformity_score = np.mean(abs(np.linalg.norm(flow - box_center, axis=1)-mean_dist), axis=0)
        uniformity_scores.append(uniformity_score)
    if len(uniformity_scores) > 0:
        return np.mean(np.array(uniformity_scores), axis=0)
    else:
        return -1


def overlapping(dragged_images, flow):
    for dragged_image in dragged_images:
        x = dragged_image['x']
        y = dragged_image['y']
        width = dragged_image['width']
        height = dragged_image['height']
        for point in flow:
            if x < point[0] < x + width and y < point[1] < y + height:
                return 1
    return 0


def margins(flow):
    flow = np.array(flow)
    canvas_dims = session.get("canvas_dims")
    dims = np.array([canvas_dims['width'], canvas_dims['height']])
    dist_from_margins = np.concatenate((dims - flow, flow), axis=1)
    min_margins = np.amin(dist_from_margins, axis=1)
    mean_margin = np.mean(min_margins)
    margin_score = np.mean(abs(min_margins-mean_margin))
    return margin_score


@app.route('/')
def index():
    return "<h1> Infographics Generation </h1>"


@app.route("/visgrps/", methods=['POST'])
def visgrps():
    if request.method == 'POST':
        data = json.loads(request.data.decode("utf-8"))
        num_vis_grps = data['numVisGrps']
        vis_grps_info = data['visGrpsInfo']
        session["num_vis_grps"] = num_vis_grps
        session["vis_grps_info"] = vis_grps_info
        return json.dumps({
            'numVisGrps': session.get("num_vis_grps"),
            'visGrpsInfo': session.get("vis_grps_info"),
            })


@app.route("/layout/", methods=['POST'])
def layout():
    if request.method == 'POST':
        data = json.loads(request.data.decode("utf-8"))
        session["canvas_dims"] = data['canvasDims']
        dragged_images = data['draggedImages']
        for dragged_image in dragged_images:
            del dragged_image['img']
        session['dragged_images'] = dragged_images
        corners, corners_padded = get_corners_in_flow(data["flowImg"])
        if corners is not None:
            corners = get_scaled_corners(corners)
            corners = corners.tolist()
            closest_flows = get_closest_flows(corners_padded)
            for i in range(len(closest_flows)):
                closest_flows[i] = get_scaled_corners(closest_flows[i])
            closest_flows = closest_flows.tolist()
        else:
            closest_flows = None
        session["corners"] = corners
        session["closest_flows"] = closest_flows
        return json.dumps({
            'corners': session.get("corners"),
            'closestFlows': session.get("closest_flows"),
            'canvasDims': session.get("canvas_dims"),
            'draggedImages': session.get('dragged_images'),
            })


if __name__ == '__main__':
    flows = np.load('flows.npy', allow_pickle=True)
    app.run(debug=True, port=5000)
