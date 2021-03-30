import React from 'react';
import styles from './GenerateSVG.module.scss';
import * as d3 from 'd3';
import { flows1, flows2, flows3 } from '../../input_flows';
import { wrap } from './wrap';
import { input4, input5 } from './sampleInput';
import * as d3_save_svg from 'd3-save-svg';
import axios from 'axios';

class GenerateSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasDims: { width: 1280, height: 960 },
            flow: flows1[3],
            vg: 'get-vg/vg1.svg',
            textInfo: this.props.textInfo,
        };
    }
    componentDidMount() {
        generateSVG(
            this.state.vg,
            this.state.flow,
            this.state.canvasDims.width,
            this.state.canvasDims.height
        );
    }

    render() {
        return (
            <div>
                <svg
                    id="svg"
                    className={styles.svgComp}
                    height={this.state.canvasDims.height}
                    width={this.state.canvasDims.width}
                />
            </div>
        );
    }
}

async function generateSVG(vg, flow, width, height) {
    let svg = d3.select('svg');

    // Defining lines, angles and centers to insert connections
    let lines = [];
    let angles = [];
    let centers = [];
    for (let i = 0; i < flow.length - 1; i++) {
        lines.push([flow[i][0], flow[i][1], flow[i + 1][0], flow[i + 1][1]]);
        angles.push(
            Math.atan2(flow[i + 1][1] - flow[i][1], flow[i + 1][0] - flow[i][0]) *
                (180 / Math.PI) +
                180
        );
        centers.push([
            (flow[i][0] + flow[i + 1][0]) / 2,
            (flow[i][1] + flow[i + 1][1]) / 2,
        ]);
    }

    // Generating last angle and center
    centers.push([
        (flow[flow.length - 1][0] + flow[0][0]) / 2,
        (flow[flow.length - 1][1] + flow[0][1]) / 2,
    ]);
    angles.push(
        Math.atan2(
            flow[0][1] - flow[flow.length - 1][1],
            flow[0][0] - flow[flow.length - 1][0]
        ) *
            (180 / Math.PI) +
            180
    );

    // Insert background image
    svg.append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', height)
        .attr('width', width)
        .attr('preserveAspectRatio', 'none')
        .attr('href', 'images/background.jpg');

    let scale = 180;
    for (let i = 0; i < flow.length; i++) {
        svg.append('g')
            .append('svg:image')
            .attr('xlink:href', vg)
            .attr('width', scale)
            .attr('x', flow[i][0] - scale / 2)
            .attr('y', flow[i][1] - scale / 2);
    }

    for (let i = 0; i < centers.length; i++) {
        svg.append('g')
            .append('svg:image')
            .attr('xlink:href', 'connections/three-dots.svg')
            .attr('width', scale)
            .attr('x', centers[i][0] - scale / 2)
            .attr('y', centers[i][1] - scale / 2)
            .attr('transform', function () {
                console.log(angles[i]);
                return (
                    'rotate(' +
                    angles[i] +
                    ',' +
                    centers[i][0] +
                    ',' +
                    centers[i][1] +
                    ')'
                );
            });
    }

    return svg.node();
}

export default GenerateSVG;
