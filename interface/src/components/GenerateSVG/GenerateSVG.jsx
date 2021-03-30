import React from 'react';
import styles from './GenerateSVG.module.scss';
import * as d3 from 'd3';
import { flows1 } from '../../input_flows';
import { wrap } from './wrap';
import { input4, input5 } from './sampleInput';
import * as d3_save_svg from 'd3-save-svg';
import axios from 'axios';

class GenerateSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasDims: { width: 1280, height: 960 },
            flow: flows1[10],
            vg: 'get-vg/vg2.svg',
            textInfo: this.props.textInfo,
        };
    }
    componentDidMount() {
        fetch(this.state.vg)
            .then((r) => r.text())
            .then((t) => {
                this.setState({
                    vg: t,
                });
                generateSVG(
                    this.state.vg,
                    this.state.flow,
                    this.state.canvasDims.width,
                    this.state.canvasDims.height
                );
            });
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
    // Getting the attributes of the vg
    let svg = d3.select('svg');

    // Generating Lines
    let lines = [];
    for (let i = 0; i < flow.length - 1; i++) {
        lines.push([flow[i][0], flow[i][1], flow[i + 1][0], flow[i + 1][1]]);
    }

    // DRAWING THE LINES
    svg.append('g')
        .selectAll('line')
        .data(lines)
        .enter()
        .append('line')
        .style('stroke', 'red')
        .style('stroke-width', 10)
        .attr('x1', function (d) {
            return d[0];
        })
        .attr('x2', function (d) {
            return d[2];
        })
        .attr('y1', function (d) {
            return d[1];
        })
        .attr('y2', function (d) {
            return d[3];
        });

    let scale = 200;
    for (let i = 0; i < flow.length; i++) {
        svg.append('svg')
            .attr('width', scale)
            .attr('height', scale)
            .attr('id', `vg${i}`)
            .attr('x', flow[i][0] - scale / 2)
            .attr('y', flow[i][1] - scale / 2)
            .html(vg);

        let textBoxWidth = svg.select(`#vg${i}`).select('.text-wrap').attr('width');

        // The text size is defined in the SVGs, so not changing that

        // Insert the new text from text field
        svg.select(`#vg${i}`)
            .select('.txt1')
            .text(input4[i].text)
            .call(wrap, textBoxWidth);

        // Insert Label
        svg.select(`#vg${i}`).select('.lb1').text(input4[i].label);

        // Should be the same for title, but I was unable to find the class for it

        // Insert image
        svg.select(`#vg${i}`).select('.img1').attr('href', input4[i].image);

        // Change class for each svg element
        svg.selectAll('.color-1')
            .nodes()
            .forEach((node) => {
                d3.select(node).attr('class', `color-1${i}`);
            });

        //Change color of SVGs
        svg.select(`#vg${i}`).select('style').text(input4[i].color);
    }

    // console.log(svg.node());
}

export default GenerateSVG;
