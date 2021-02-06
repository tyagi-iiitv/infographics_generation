from flask import Flask, request
import pandas as pd
import numpy as np
import json

app = Flask(__name__)

def get_uniformity(box_center, flow):
    box_center = np.array(box_center)
    flow = np.array(flow)
    mean_dist = sum([np.linalg.norm(x[1:3]-box_center) for x in flow])/len(flow)
    return sum([abs(np.linalg.norm(x[1:3]-box_center)-mean_dist) for x in flow])

@app.route("/layout", methods=['POST'])
def index():
    if request.method == 'POST':
        box_center = json.loads(request.data.decode("utf-8"))['box-center']
        scores = []
        for i,flow in enumerate(flows):
            scores.append(get_uniformity(box_center, flow))
        flows_df = pd.DataFrame(flows, columns=['flow_vals'])
        flows_df['scores'] = scores
        flows_df['id'] = flows_df.index
        flows_df = flows_df.sort_values(by=['scores'])
        flows_df = flows_df.assign(flow_vals=flows_df['flow_vals']).explode('flow_vals')
        flows_df[['bb_id','x','y','l','w']] = pd.DataFrame(flows_df['flow_vals'].tolist(), index=flows_df.index)
        flows_df = flows_df[['x','y','scores', 'id']]
        flows_df['id'] = flows_df['id'].astype('str')
        return flows_df.to_json()

if __name__ == '__main__':
    flows = np.load('flows.npy', allow_pickle=True)
    app.run(debug=True)
