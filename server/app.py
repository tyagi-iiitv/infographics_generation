from flask import Flask, request, session, send_from_directory
import pandas as pd
import numpy as np
import json
import base64
import re
import cv2
import numpy as np
from annoy import AnnoyIndex
from scipy.spatial import ConvexHull
from lxml import etree
import os


app = Flask(__name__)
app.secret_key = 'info'

# Loads the flows array
flows = np.load('flows.npy', allow_pickle=True)

SVGNS = 'http://www.w3.org/2000/svg'

def get_vf_image(flow, height, width):
    print(flow)
    black = np.zeros((height, width, 3), np.uint8)
    for i in range(len(flow)):
        cv2.circle(black, (int(flow[i][0]), int(flow[i][1])), 5, (0, 0, 255), -1)

    for i in range(len(flow) - 1):
        cv2.line(black, (int(flow[i][0]), int(flow[i][1])), (int(flow[i + 1][0]), int(flow[i + 1][1])), (0, 0, 255), 30)
    
    return black

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
    closest_flow_indexes = u.get_nns_by_vector(corners, 25, search_k=-1, include_distances=False)
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


# Scales  up the points to the canvas size
def scale_up_flow(flow):
    flow = np.array(flow).reshape(-1, 2)
    canvas_dims = session.get('canvas_dims')
    dims = np.array([[canvas_dims['width'], canvas_dims['height']]])
    return (flow*dims).tolist()

# Scales down the points to square of size 1
def scale_down_flow(flow):
    flow = np.array(flow).reshape(-1, 2)
    canvas_dims = session.get('canvas_dims')
    dims = np.array([[canvas_dims['width'], canvas_dims['height']]])
    return (flow/dims).tolist()


# Gives a ranking to see how uniformly spread around
# the dragged object, the flow is
def get_uniformity(dragged_images, flow):
    if flow is not None:
        canvas_dims = session.get('canvas_dims')
        flow = scale_down_flow(flow)
        uniformity_scores = []
        canvas_dims = session.get('canvas_dims')
        for dragged_image in dragged_images:
            x = dragged_image['x']/canvas_dims['width']
            y = dragged_image['y']/canvas_dims['height']
            width = dragged_image['width']/canvas_dims['width']
            height = dragged_image['height']/canvas_dims['height']
            box_center = np.array([(x + width)/2, (y + height)/2])
            uniformity_score = np.var(abs(np.linalg.norm(flow - box_center, axis=1)), axis=0)
            uniformity_scores.append(uniformity_score)
        if len(uniformity_scores) > 0:
            return (1 - float(np.mean(uniformity_scores)))
    return 1


# Gives a ranking to see if the flow is overlapping some dragged image
def get_overlapping(dragged_images, flow):
    if flow is not None:
        canvas_dims = session.get('canvas_dims')
        flow = scale_down_flow(flow)
        for dragged_image in dragged_images:
            x = dragged_image['x']/canvas_dims['width']
            y = dragged_image['y']/canvas_dims['height']
            width = dragged_image['width']/canvas_dims['width']
            height = dragged_image['height']/canvas_dims['height']
            for point in flow:
                if x < point[0] < x + width and y < point[1] < y + height:
                    return 0
    return 1


# Returns the coverage area of the points
def get_coverage_area(dragged_images, flow):
    if flow is not None:
        flow = np.array(scale_down_flow(flow))
        canvas_dims = session.get('canvas_dims')
        for dragged_image in dragged_images:
            x = dragged_image['x']/canvas_dims['width']
            y = dragged_image['y']/canvas_dims['height']
            flow = np.vstack((flow, np.array([x, y])))
        try:
            hull = ConvexHull(flow)
            return hull.volume
        except:
            # If cannot get COnvexHull area, get total area minus all four margins
            mini = np.amin(flow, axis=0)
            maxi = np.amax(flow, axis=0)
            return 1 - float(np.sum(mini) + np.sum(maxi))
    return 0


# Takes in all the three rankings and gives an overall ranking
def get_overall_ranking(dragged_images, closest_flow):
    uniformity = get_uniformity(dragged_images, closest_flow)
    overlapping = get_overlapping(dragged_images, closest_flow)
    coverage = get_coverage_area(dragged_images, closest_flow)
    alpha = 0.5
    return overlapping*(alpha*uniformity + (1-alpha)*coverage)


# Gets flows, when no points detecetd in user-drawn flow
def get_flows_for_empty_canvas(num_vg):
    match=[]
    for i, row in enumerate(flows):
        flow_arr = np.array(row)[:, 1:3]
        if len(flow_arr) == num_vg:
            match.append(flow_arr.tolist())
    return match


# Changes text of the SVG data
def change_text(svg, new_text):
    svg = etree.fromstring(svg)
    find_text = etree.ETXPath("//{%s}text[@class='txt1']" % (SVGNS))
    find_text(svg)[0].text = new_text.strip()
    return etree.tostring(svg).decode("utf-8")


# Changes labels of the SVG data
def change_label(svg, new_label):
    svg = etree.fromstring(svg)
    find_label = etree.ETXPath("//{%s}text[@class='lb1']" % (SVGNS))
    find_label(svg)[0].text = new_label.strip()
    return etree.tostring(svg).decode("utf-8")


@app.route('/')
def index():
    return '<h1>Infographics Generation</h1>'


@app.route('/visgrps/', methods=['POST'])
def visgrps():
    data = json.loads(request.data.decode('utf-8'))
    num_vis_grps = data['numVisGrps']
    vis_grps_info = data['visGrpsInfo']
    session['num_vis_grps'] = num_vis_grps
    session['vis_grps_info'] = vis_grps_info
    return json.dumps({
        'numVisGrps': num_vis_grps,
        'visGrpsInfo': vis_grps_info,
        })

@app.route('/save-vg', methods=['POST'])
def save_vg():
    data = json.loads(request.data.decode('utf-8'))
    f = open('vg_svgs/vg.svg', 'w')
    f.write(data['vgCode'])
    f.close()
    return "OK"

@app.route('/get-vg/<path:path>', methods=['GET'])
def get_image(path):
    return send_from_directory('vg_svgs', path, as_attachment=True)


@app.route('/layout/', methods=['POST'])
def set_layout():
    # Get POST request from API call
    data = json.loads(request.data.decode('utf-8'))

    # Save canvas dimensions in sessions
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
        corners = scale_up_flow(corners)
        closest_flows = get_closest_flows(corners_padded)
        if closest_flows is not None:
            for i in range(len(closest_flows)):
                closest_flows[i] = scale_up_flow(closest_flows[i])
    else:
        # If corners are not detected, get all flows with same
        # number of visual groups as entered by the user and scale them
        closest_flows = get_flows_for_empty_canvas(session.get('num_vis_grps'))
        for i in range(len(closest_flows)):
            closest_flows[i] = scale_up_flow(closest_flows[i])

    session['closest_flows'] = closest_flows

    # Ranking of the closest flows
    closest_flow_rankings = []
    for closest_flow in closest_flows:
        overall_rank = get_overall_ranking(dragged_images, closest_flow)
        closest_flow_rankings.append(overall_rank)

    sorting_indices = np.argsort(closest_flow_rankings)[::-1]
    closest_flows = np.array(closest_flows)[sorting_indices].tolist()[:50]
    session['closest_flows'] = closest_flows

    # SVG string
    # session['svg'] = open('vg6.html').read()
    # session['svg'] = '''<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 755 563"><script src="d3.js"></script><script src="d3plus.js"></script><defs><style>.color1{fill:#a1d13b;}</style></defs><path class="color1" d="M435.48,106,310.18,221.83c27.56,25.46,27.56,66.85.07,92.37s-72.44,25.45-99.89,0L131,387.49,235.44,484a7.88,7.88,0,0,1,0,11.62,9.27,9.27,0,0,1-4,2.06,6.15,6.15,0,0,0-1.64.21A36.65,36.65,0,0,0,210.36,507c-13.88,12.79-13.88,33.48,0,46.24s36.15,12.72,50,0a32.16,32.16,0,0,0,9.84-18v0a7.14,7.14,0,0,0,.27-1.53l.06-.06a7.52,7.52,0,0,1,2.21-3.59,9.32,9.32,0,0,1,12.5,0L435.51,669c73.92-74,119.24-172.83,119.24-281.49S509.42,180,435.48,106Z" transform="translate(-131 -106)"/><text class="lb1" x="220" y="350" font-size="180">L</text><image class="img1" x='580' y='180' href='https://github.com/thepushkarp.png' width='100' height='100'/><rect class="text-wrap" height="200" width="170" x="560" y="280" style="fill:none"/><text id="wrap" class="txt1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</text><script>d3plus.textwrap().container(d3.select("#wrap")).draw();</script></svg>'''
    # temp= '''<text id="wrap" class="txt1" x="560" y="280" style="font-size: 80">Dummy Text here</text>'''
    svg = '''<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 855 563"><defs><style>.color1{fill:#a1d13b;}</style></defs><path class="color1" d="M435.48,106,310.18,221.83c27.56,25.46,27.56,66.85.07,92.37s-72.44,25.45-99.89,0L131,387.49,235.44,484a7.88,7.88,0,0,1,0,11.62,9.27,9.27,0,0,1-4,2.06,6.15,6.15,0,0,0-1.64.21A36.65,36.65,0,0,0,210.36,507c-13.88,12.79-13.88,33.48,0,46.24s36.15,12.72,50,0a32.16,32.16,0,0,0,9.84-18v0a7.14,7.14,0,0,0,.27-1.53l.06-.06a7.52,7.52,0,0,1,2.21-3.59,9.32,9.32,0,0,1,12.5,0L435.51,669c73.92-74,119.24-172.83,119.24-281.49S509.42,180,435.48,106Z" transform="translate(-131 -106)"/><text class="lb1" x="220" y="350" font-size="180"></text><text class='txt1' id='wrap' x='560' y='180' style='font-size: 64'></text></svg>'''

    # Creating SVGs for each visual group
    svgs = []
    img_links = []
    vis_grps_info = session.get('vis_grps_info')
    for i in range(session.get('num_vis_grps')):
        curr_svg = svg
        curr_svg = change_text(curr_svg, vis_grps_info[i].get('text'))
        curr_svg = change_label(curr_svg, vis_grps_info[i].get('label'))
        svgs.append(curr_svg)
        img_links.append(vis_grps_info[i].get('image'))

    session['svgs'] = svgs
    session['img_links'] = img_links

    # print(session.get('canvas_dims')['width'])
    # # Creating VIF flow images and saving in the frontend directory
    # for i,flow in enumerate(session.get('closest_flows')):
    #     image = get_vf_image(flow, session.get('canvas_dims')['height'], session.get('canvas_dims')['width'])
    #     cv2.imwrite('../interface/public/flowImages/flow_'+str(i)+'.jpg', image)

    return json.dumps({
        'closestFlows': session.get('closest_flows'),
        'numVisGrps': session.get('num_vis_grps'),
        'svgs': session.get('svgs'),
        'imgLinks': session.get('img_links')
    })


@app.route('/layout/', methods=['GET'])
def get_layout():
    return json.dumps({
        'closestFlows': session.get('closest_flows'),
        'numVisGrps': session.get('num_vis_grps'),
        'svgs': session.get('svgs'),
        'imgLinks': session.get('img_links')
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)