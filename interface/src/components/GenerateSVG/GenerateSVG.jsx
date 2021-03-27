import React from 'react';
import styles from './GenerateSVG.module.scss';
import * as d3 from 'd3';
import { flows1 } from '../../input_flows';

class GenerateSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasDims: { width: 1280, height: 960 },
            flow: flows1[1],
            vg: 'svgImages/svg1.svg',
        };
    }
    componentDidMount() {
        generateSVG(this.state.vg, this.state.flow);
    }

    render() {
        return (
            <svg
                id="svg"
                className={styles.svgComp}
                height={this.state.canvasDims.height}
                width={this.state.canvasDims.width}
            />
        );
    }
}

async function generateSVG(vg, flow) {
    let svg = d3.select('svg');

    // DRAWING THE FLOW
    svg.selectAll('line')
        .data(flow)
        .enter()
        .append('g')
        .each(function (d, i) {
            d3.select(this)
                .selectAll('line')
                .enter()
                .append('line')
                .attr('x1', d[i][0])
                .attr('x2', d[i + 1][0])
                .attr('y1', d[i][1])
                .attr('y2', d[i + 1][1])
                .style('stroke', 'red')
                .style('stroke-width', 10);
        });

    // svg.append('line')
    //     .style("stroke", "red")
    //     .style("stroke-width", 10)
    //     .attr('x1', flow[0][0])
    //     .attr('x2', flow[1][0])
    //     .attr('y1', flow[0][1])
    //     .attr('y2', flow[1][1])

    // LOADING AN SVG IMAGE
    // let divsvg = svg.node(0);
    // await d3.xml(vg).then((data) => {
    //     divsvg.append(data.documentElement);
    // });

    return svg.node();
}

export default GenerateSVG;
