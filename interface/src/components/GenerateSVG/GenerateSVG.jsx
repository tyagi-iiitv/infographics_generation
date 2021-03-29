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
            vg: '/get-vg/vg.svg',
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
    // Getting the attributes of the vg
    let svg = d3.select('svg');
    // Adding VG code to cur SVG
    // let q = d3_queue.queue();
    // for(let i=0;i<flow.length;i++){
    //     q.defer(d3.xml, vg);
    // }

    // // // Generating Lines
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
        svg.append('g')
            .append('svg:image')
            .attr('xlink:href', vg)
            .attr('width', scale)
            .attr('x', flow[i][0] - scale / 2)
            .attr('y', flow[i][1] - scale / 2);
    }

    // let vgCode = await (await d3.xml(vg)).childNodes[0];

    // for(let i=0;i<flow.length;i++){
    //     svg.append('g')
    //     .attr('class', 'shape')
    //     .node()
    //     .appendChild(vgCode)
    //     d3.select('svg')
    //     .attr('transform', 'translate(' + flow[i][0] + ',' + flow[i][1] + ') scale(0.1)')

    //     console.log(svg)
    // }

    // svg.selectAll('g.shape')
    //     .data(flow)
    //     .enter()
    //     .append('g')
    //     .attr('class', 'shape')
    // .attr('transform', function(d){
    //     console.log(d)
    //     return 'translate(' + d[0] + ',' + d[1] + ')'
    // })
    // .each(function(d,i){
    //     this.appendChild(vgCode);
    // this.appendChild(vgCode);
    // console.log(this.appendChild(vgCode))
    // d3.select(this).selectAll('svg')
    // .attr('transform', function(d){
    //     // console.log(d)
    //     return 'translate(' + d[0] + ',' + d[1] + ')'
    // });
    //     console.log(this)
    // });

    // let divsvg = svg.node(0);

    // await d3.xml(vg).then((data) => {
    //     divsvg.append(data.documentElement);
    // });

    // rect coordinates for text wrapping
    // let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    // let textBoxWidth = d3.select('.text-wrap').attr('width')
    // // Insert the new text from text field
    // d3.select('.txt1').text(input4[0].text).call(wrap, textBoxWidth);

    // // Insert Label
    // d3.select('.lb1').text(input4[0].label);

    // // Insert Image
    // d3.select('.img1').attr('href', input4[3].image);
    // // Scale the figure with the width parameter

    // const response = await axios.post('/save-vg', {
    //     vgCode: svg.node().innerHTML
    // })

    // console.log(svg)

    // svg.append('line')
    //     .style("stroke", "red")
    //     .style("stroke-width", 10)
    //     .attr('x1', flow[0][0])
    //     .attr('x2', flow[1][0])
    //     .attr('y1', flow[0][1])
    //     .attr('y2', flow[1][1])

    // console.log(d3.select('.text-wrap'))

    // LOADING AN SVG IMAGE
    // let divsvg = svg.node(0);
    // await d3.xml(vg).then((data) => {
    //     divsvg.append(data.documentElement);
    // });

    return svg.node();
}

export default GenerateSVG;
