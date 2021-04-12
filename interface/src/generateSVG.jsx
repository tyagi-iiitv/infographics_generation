import { faLifeRing } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { textwrap } from 'd3-textwrap';

// import {wrap} from './wrap';

export default function generateSVG(
    flow,
    width,
    height,
    background,
    vg,
    input,
    connectionType,
    connection,
    pivot,
    pivotLocation,
    colors
) {
    console.log(connectionType, connection);
    var d3 = require('d3'),
        jsdom = require('jsdom');

    const { JSDOM } = jsdom;
    d3.textwrap = textwrap;
    const { document } = new JSDOM('').window;
    // global.document = document;
    var body = d3.select(document).select('body');

    var svg = body.append('svg').attr('viewBox', `0 0 ${width} ${height}`);

    let lines = [];
    let angles = [];
    let centers = [];
    let scaleC = 100;
    for (let i = 0; i < flow.length - 1; i++) {
        lines.push([flow[i][0], flow[i][1], flow[i + 1][0], flow[i + 1][1]]);
    }

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

        let wrap = d3.textwrap().bounds({ width: textBoxWidth, height: 200 });
        // Insert the new text from text field
        svg.select(`#vg${i}`).select('.txt1').text(input[i].text).call(wrap);

        // Insert Label
        svg.select(`#vg${i}`).select('.lb1').text(input[i].label);

        // Should be the same for title, but I was unable to find the class for it

        // Insert image
        svg.select(`#vg${i}`).select('.img1').attr('href', input[i].image);

        svg.selectAll('.color-1')
            .nodes()
            .forEach((node) => {
                d3.select(node).attr('class', `color-1${i}`);
            });

        //Change color of SVGs
        let orgStyle = svg.select(`#vg${i}`).select('style').text();
        svg.select(`#vg${i}`)
            .select('style')
            .text(orgStyle + `.color-1${i}{fill:${colors[i]};}`);
    }

    if (connectionType > 0) {
        if (connectionType === 1) {
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
        }
        if (connectionType === 2) {
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
        }
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

    for (let i = 0; i < centers.length; i++) {
        svg.append('g')
            .append('svg:image')
            .attr('xlink:href', connection)
            .attr('width', scaleC)
            .attr('x', centers[i][0] - scaleC / 2)
            .attr('y', centers[i][1] - scaleC / 2)
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

    if (pivot) {
        svg.append('image')
            .attr('x', pivotLocation.x)
            .attr('y', pivotLocation.y)
            .attr('width', pivotLocation.width)
            .attr('height', pivotLocation.height)
            .attr('href', pivot);
    }

    return { __html: body.node().innerHTML };
    // const fs = require('fs');
    // fs.writeFileSync("test.svg", body.node().innerHTML)
}
