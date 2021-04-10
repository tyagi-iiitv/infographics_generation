import axios from 'axios';

export default function generateSVG(flow, width, height, background, vg) {
    var d3 = require('d3'),
        jsdom = require('jsdom');

    const { JSDOM } = jsdom;

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

    let scale = 350;
    for (let i = 0; i < flow.length; i++) {
        svg.append('svg')
            .attr('width', scale)
            .attr('height', scale)
            .attr('id', `vg${i}`)
            .attr('x', flow[i][0] - scale / 2)
            .attr('y', flow[i][1] - scale / 2)
            .html(vg);
    }

    console.log(body.node().innerHTML);
    return { __html: body.node().innerHTML };
    // const fs = require('fs');
    // fs.writeFileSync("test.svg", body.node().innerHTML)
}
