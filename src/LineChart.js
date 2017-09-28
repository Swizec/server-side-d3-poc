
import React, { Component } from 'react';

import * as d3 from 'd3';
import { Axis } from './Axis';

export class LineChart extends Component {
    line = d3.line()
             .x(d => this.xScale(d.date))
             .y(d => this.yScale(d.time));

    yScale = d3.scaleLinear()
               .range([500, 0]);

    xScale = d3.scaleTime()
               .range([0, 800]);

    xFormat = d => [Math.floor(d/60**2),
                    Math.floor((d%60**2)/60),
                    Math.floor(d%60**2%60)]
                        .map(s => String(s).padStart(2, "0"))
                        .join(':');

    yFormat = d => d.getFullYear();

    componentWillMount() { this.updateD3(this.props) }
    componentWillReceiveProps(nextProps) { this.updateD3(nextProps) }

    updateD3({ data }) {
        this.yScale.domain([2*60**2, d3.max(data, d => d.time)]);
        this.xScale.domain(d3.extent(data, d => d.date));
    }

    render() {
        const { x, y, data } = this.props;

        return (
            <g transform={`translate(${x}, ${y})`}>
                <path d={this.line(data)} style={{fill: 'none',
                                                  stroke: 'steelblue',
                                                  strokeWidth: 2}} />

                <Axis scale={this.yScale}
                      x={0}
                      y={0}
                      orient="Left"
                      format={this.xFormat}/>
                <Axis scale={this.xScale}
                      x={0}
                      y={500}
                      orient="Bottom"
                      format={this.yFormat}/>
            </g>
        );
    }
}
