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
    // console.log(flow, vg, input, connectionType, connection);
    var d3 = require('d3'),
        jsdom = require('jsdom');

    const { JSDOM } = jsdom;
    d3.textwrap = textwrap;
    const { document } = new JSDOM('').window;
    // global.document = document;
    var body = d3.select(document).select('body');

    var svg = body.append('svg').attr('viewBox', `0 0 ${width} ${height}`);

    let lines = [];
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
    return { __html: body.node().innerHTML };
    // const fs = require('fs');
    // fs.writeFileSync("test.svg", body.node().innerHTML)
}
