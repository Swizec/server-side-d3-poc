
import React, { Component } from 'react';
import * as d3 from 'd3';

export class Axis extends Component {
    componentDidMount() { this.renderAxis() }
    componentDidUpdate() { this.renderAxis() }

    renderAxis() {
        const { orient, scale, format } = this.props;

        d3.select(this.refs.anchor)
          .call(
              d3[`axis${orient}`](scale)
                .tickFormat(format)
          );
    }

    render() {
        const { x, y } = this.props;
        return <g ref="anchor" transform={`translate(${x}, ${y})`} />
    }
}
