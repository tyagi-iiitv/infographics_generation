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


def get_corners_in_flow(flow_img):
    dataUrlPattern = re.compile('data:image/png;base64,(.*)$')
    flow_imgb64 = dataUrlPattern.match(flow_img).group(1)
    flow_img = base64.b64decode(flow_imgb64)

    flow_as_np = np.frombuffer(flow_img, dtype=np.uint8)
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
    corners = cv2.goodFeaturesToTrack(skel, num_vis_grps, 0.2, 128)

    if (corners is None):
        return None
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


def get_uniformity(box_center, flow):
    box_center = np.array(box_center)
    flow = np.array(flow)
    mean_dist = sum([np.linalg.norm(x[1:3]-box_center) for x in flow])/len(flow)
    return sum([abs(np.linalg.norm(x[1:3]-box_center)-mean_dist) for x in flow])


def overlapping(box_dims, flow):
    box_dims = np.array(box_dims)
    flow = np.array(flow)
    for i,elem in enumerate(flow):
        if elem[1] < box_dims[0]+box_dims[2] and elem[2] < box_dims[1]+box_dims[3]:
            return 0
    return 1


def margins(flow):
    flow = np.array(flow)
    mean_margin = sum([min(x[1:3]) for x in flow])/len(flow)
    return sum([abs(min(x[1:3])-mean_margin) for x in flow])


def get_scaled_corners(corners):
    corners = corners.reshape(-1, 2)
    canvas_dims = session.get("canvas_dims")
    dims = np.array([canvas_dims['width'], canvas_dims['height']])
    return corners*dims


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
        corners, corners_padded = get_corners_in_flow(data["flowImg"])
        corners = get_scaled_corners(corners)
        session["corners"] = corners.tolist()
        closest_flows = get_closest_flows(corners_padded)
        for i in range(len(closest_flows)):
            closest_flows[i] = get_scaled_corners(closest_flows[i])
        session["closest_flows"] = closest_flows.tolist()
        return json.dumps({
            'corners': session.get("corners"),
            'closestFlows': session.get("closest_flows"),
            })

        # box_center = json.loads(request.data.decode("utf-8"))['box-center']
        # scores = []
        # for i,flow in enumerate(flows):
        #     scores.append(get_uniformity(box_center, flow))
        # flows_df = pd.DataFrame(flows, columns=['flow_vals'])
        # flows_df['scores'] = scores
        # flows_df['id'] = flows_df.index
        # flows_df = flows_df.sort_values(by=['scores'])
        # flows_df = flows_df.assign(flow_vals=flows_df['flow_vals']).explode('flow_vals')
        # flows_df[['bb_id','x','y','l','w']] = pd.DataFrame(flows_df['flow_vals'].tolist(), index=flows_df.index)
        # flows_df = flows_df[['x','y','scores', 'id']]
        # flows_df['id'] = flows_df['id'].astype('str')
        # return flows_df.to_json()


if __name__ == '__main__':
    flows = np.load('flows.npy', allow_pickle=True)
    app.run(debug=True, port=5000)
