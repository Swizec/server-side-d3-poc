import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import data from './data.csv';
import * as d3 from 'd3';

import { LineChart } from './LineChart';

const If = ({ c, children }) => c() ? children : null;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: (props.data || []).map(this.rowParse)
        }
    }

    dateParse = d3.timeParse("%d %b %Y");

    rowParse = ({ date, time, runner }) => ({
        date: this.dateParse(date),
        time: time.split(':')
                  .map(Number)
                  .reverse()
                  .reduce((t, n, i) => i > 0 ? t+n*60**i : n),
        runner
    });

    componentWillMount() {
        if (!this.state.data.length) {
            d3.csv("https://raw.githubusercontent.com/Swizec/server-side-d3-poc/master/src/data.csv")
              .row(this.rowParse)
              .get(data => this.setState({ data }))
        }
    }

    render() {
        const { data } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Server-side rendering a D3 chart</h1>
                </header>
                <h3>Boston Marathon winning times</h3>
                <If c={() => data.length}>
                    <svg width="800" height="600">
                        <LineChart data={data}
                                   x={100}
                                   y={50}/>
                    </svg>
                </If>
            </div>
        );
    }
}

export default App;
