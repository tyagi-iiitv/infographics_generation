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
            flow: flows1[1],
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

    // Insert background image
    svg.append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', height)
        .attr('width', width)
        .attr('preserveAspectRatio', 'none')
        .attr('href', 'images/background.jpg');

    let scale = 300;
    for (let i = 0; i < flow.length; i++) {
        svg.append('g')
            .append('svg:image')
            .attr('xlink:href', vg)
            .attr('width', scale)
            .attr('x', flow[i][0] - scale / 2)
            .attr('y', flow[i][1] - scale / 2);
    }

    return svg.node();
}

export default GenerateSVG;
