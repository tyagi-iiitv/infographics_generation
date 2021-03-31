import React from 'react';
import styles from './GenerateSVG.module.scss';
import * as d3 from 'd3';
import { flows, indexes } from '../../input_flows';
import { wrap } from './wrap';
import { input4, input5, colours4, colours5 } from './sampleInput';
import * as d3_save_svg from 'd3-save-svg';
import axios from 'axios';

class GenerateSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasDims: { width: 1280, height: 960 },
            flowId: [1, 0],
            vg: 'svgImages/vg1.svg',
            pivot: 'images/pivot.png',
            background: 'images/background3.jpg',
            textInfo: this.props.textInfo,
            connectionType: 'regular', // Choose b/w {regular, pivot and alternate}
            includeLast: true, // Whether to generate last connection or not
            input: input5,
            connection: 'connections/glasses.svg',
            useCase: 1,
            colours: colours5[0],
        };
    }

    componentDidMount() {
        fetch(this.state.vg)
            .then((r) => r.text())
            .then((t) => {
                this.setState({
                    vg: t,
                });

                let connections = [
                    'arrow',
                    'arrow2',
                    'arrow3',
                    'arrow4',
                    'curved_rect',
                    'curved-arrow',
                    'glasses',
                    'minus-line',
                    'striped-arrow',
                    'striped-stick',
                    'three-curved-arrows',
                    'three-dots',
                ];

                // Looping over 3 use cases
                for (var useCase = 1; useCase < 4; useCase++) {
                    let connectionTypes;
                    if (useCase === 1) {
                        connectionTypes = ['regular', 'alternate'];
                    } else {
                        connectionTypes = ['regular', 'pivot', 'alternate'];
                    }
                    // Looping over all 3 flows
                    for (var flowsIdx = 0; flowsIdx < flows.length; flowsIdx++) {
                        // Looping over the best flows in each flow
                        for (var bestFlowIdx of indexes[flowsIdx]) {
                            let input, colours;
                            if (flowsIdx === 0) {
                                input = input4;
                                colours = colours4;
                            } else {
                                input = input5;
                                colours = colours5;
                            }
                            // Looping over connection types
                            for (var connectionType of connectionTypes) {
                                // Looping over colours
                                for (
                                    var colourIdx = 0;
                                    colourIdx < colours.length;
                                    colourIdx++
                                ) {
                                    // Looping over Visual Elements
                                    for (var vgIdx = 1; vgIdx < 26; vgIdx++) {
                                        let vg = `svgImages/vg${vgIdx}.svg`;
                                        // Looping over connection types
                                        for (var connectionStr of connections) {
                                            let connection = `connections/${connectionStr}.svg`;
                                            d3.select('svg').text('');
                                            generateSVG(
                                                [vgIdx, vg],
                                                [flowsIdx, bestFlowIdx],
                                                this.state.canvasDims.width,
                                                this.state.canvasDims.height,
                                                this.state.background,
                                                this.state.pivot,
                                                connectionType,
                                                this.state.includeLast,
                                                input,
                                                [connectionStr, connection],
                                                useCase,
                                                [colourIdx, colours[colourIdx]]
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
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

async function generateSVG(
    vgInfo,
    flowId,
    width,
    height,
    background,
    pivot,
    connectionType,
    includeLast,
    input,
    connectionInfo,
    useCase,
    coloursInfo
) {
    let svg = d3.select('svg');

    let flow = flows[flowId[0]][flowId[1]],
        coloursIdx = coloursInfo[0],
        colours = coloursInfo[1],
        vgIdx = vgInfo[0],
        vg = vgInfo[1],
        connectionStr = connectionInfo[0],
        connection = connectionInfo[1];
    // console.log(flowId, connectionType, useCase, colourIdx);

    let pivotCenter;
    if (useCase === 2) {
        // Pivot centers for second use case with scale 1
        pivotCenter = { x: width / 2 - 100, y: 550 };
    } else if (useCase === 3) {
        // Pivot centers for third use cases (set scale = 0.75 while loading the image for third use case)
        pivotCenter = { x: width / 2 + 100, y: 60 };
    }

    // Defining lines, angles and centers to insert connections
    let lines = [];
    let angles = [];
    let centers = [];
    let offsetX = 200;
    let offsetY = 100;

    for (let i = 0; i < flow.length - 1; i++) {
        lines.push([flow[i][0], flow[i][1], flow[i + 1][0], flow[i + 1][1]]);
    }

    if (connectionType === 'pivot') {
        // Generating connections b/w elements and pivot
        for (let i = 0; i < flow.length - 1; i++) {
            angles.push(
                Math.atan2(flow[i][1] - pivotCenter.y, flow[i][0] - pivotCenter.x) *
                    (180 / Math.PI) +
                    180
            );
            centers.push([
                (flow[i][0] + pivotCenter.x + offsetX) / 2,
                (flow[i][1] + pivotCenter.y + offsetY) / 2,
            ]);
        }
        // Generating the last center and angle
        if (includeLast) {
            centers.push([
                (flow[flow.length - 1][0] + pivotCenter.x + offsetX) / 2,
                (flow[flow.length - 1][1] + pivotCenter.y + offsetY) / 2,
            ]);
            angles.push(
                Math.atan2(
                    pivotCenter.y + offsetY - flow[flow.length - 1][1],
                    pivotCenter.x + offsetX - flow[flow.length - 1][0]
                ) *
                    (180 / Math.PI) +
                    180
            );
        }
    } else if (connectionType === 'alternate') {
        for (let i = 0; i < flow.length - 2; i++) {
            angles.push(
                Math.atan2(
                    flow[i + 2][1] - flow[i][1],
                    flow[i + 2][0] - flow[i][0]
                ) *
                    (180 / Math.PI) +
                    180
            );
            centers.push([
                (flow[i][0] + flow[i + 2][0]) / 2,
                (flow[i][1] + flow[i + 2][1]) / 2,
            ]);
        }
    } else {
        // Generating regular connections b/w sequential elements
        for (let i = 0; i < flow.length - 1; i++) {
            angles.push(
                Math.atan2(
                    flow[i + 1][1] - flow[i][1],
                    flow[i + 1][0] - flow[i][0]
                ) *
                    (180 / Math.PI) +
                    180
            );
            centers.push([
                (flow[i][0] + flow[i + 1][0]) / 2,
                (flow[i][1] + flow[i + 1][1]) / 2,
            ]);
        }
        if (includeLast) {
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
        }
    }

    // Insert background image
    svg.append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', height)
        .attr('width', width)
        .attr('preserveAspectRatio', 'none')
        .attr('href', background);

    let scale = 350;
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
            .text(input[i].text)
            .call(wrap, textBoxWidth);

        // Insert Label
        svg.select(`#vg${i}`).select('.lb1').text(input[i].label);

        // Should be the same for title, but I was unable to find the class for it

        // Insert image
        svg.select(`#vg${i}`).select('.img1').attr('href', input[i].image);

        // Change class for each svg element
        svg.selectAll('.color-1')
            .nodes()
            .forEach((node) => {
                d3.select(node).attr('class', `color-1${i}`);
            });

        //Change color of SVGs
        let orgStyle = svg.select(`#vg${i}`).select('style').text();
        svg.select(`#vg${i}`)
            .select('style')
            .text(orgStyle + `.color-1${i}{fill:${colours[i]};}`);
    }

    // let scaleVG = 250;
    let scaleC = 100;
    // for (let i = 0; i < flow.length; i++) {
    //     svg.append('g')
    //         .append('svg:image')
    //         .attr('xlink:href', vg)
    //         .attr('width', scaleVG)
    //         .attr('x', flow[i][0] - scaleVG / 2)
    //         .attr('y', flow[i][1] - scaleVG / 2);
    // }

    for (let i = 0; i < centers.length; i++) {
        svg.append('g')
            .append('svg:image')
            .attr('href', connection)
            .attr('width', scaleC)
            .attr('x', centers[i][0] - scaleC / 2)
            .attr('y', centers[i][1] - scaleC / 2)
            .attr('transform', function () {
                // console.log(angles[i]);
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

    // svg.append('g')
    //     .selectAll('line')
    //     .data(lines)
    //     .enter()
    //     .append('line')
    //     .style('stroke', 'red')
    //     .style('stroke-width', 10)
    //     .attr('x1', function (d) {
    //         return d[0];
    //     })
    //     .attr('x2', function (d) {
    //         return d[2];
    //     })
    //     .attr('y1', function (d) {
    //         return d[1];
    //     })
    //     .attr('y2', function (d) {
    //         return d[3];
    //     });

    if (useCase === 2) {
        // Positioning for 2nd
        svg.append('image')
            .attr('x', pivotCenter.x)
            .attr('y', pivotCenter.y)
            .attr('href', pivot);
    } else if (useCase === 3) {
        svg.append('image')
            .attr('x', pivotCenter.x)
            .attr('y', pivotCenter.y)
            .attr('href', pivot)
            .attr('transform', 'scale(0.75)');
    }

    svg.attr('xmlns', 'http://www.w3.org/2000/svg');

    const response = await axios.post('/save_vg/', {
        vgCode: svg.node().outerHTML,
        uc: useCase,
        fl: `${flowId[0]}[${flowId[1]}]`,
        vg: vgIdx,
        cl: coloursIdx,
        cnt: connectionType,
        cne: connectionStr,
    });
    console.log(response);
}

export default GenerateSVG;
