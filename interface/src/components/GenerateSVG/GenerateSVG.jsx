import React from 'react';
import styles from './GenerateSVG.module.scss';
import * as d3 from 'd3';

class GenerateSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasDims: { width: 1280, height: 960 },
        };
    }
    componentDidMount() {
        generateSVG(this.state.canvasDims.width, this.state.canvasDims.height);
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

async function generateSVG(width, boxHeight) {
    let svg = d3.select('svg');
    let divsvg = svg.node(0);
    await d3.xml('images/vg.svg').then((data) => {
        divsvg.append(data.documentElement);
    });
    // let nodes = [];
    // nodes.push([width / 2, boxHeight / 1.5]);
    // nodes.push([width / 4, boxHeight / 3]);

    // // Append the nodes to the svg element
    // for (let i = 0; i < nodes.length; i++) {
    //     svg
    //     .append('circle')
    //     .attr('cx', nodes[i][0])
    //     .attr('cy', nodes[i][1])
    //     .attr('r', 20)
    //     .style('fill', 'green');
    // }

    // // Create a horizontal link from the first node to the second
    // const link = d3.linkHorizontal()({
    //     source: nodes[0],
    //     target: nodes[1]
    // });

    // // Append the link to the svg element
    // svg
    //     .append('path')
    //     .attr('d', link)
    //     .attr('stroke', 'black')
    //     .attr('fill', 'none');

    return svg.node();
}

export default GenerateSVG;
