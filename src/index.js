import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as d3 from 'd3';

d3.csv("https://raw.githubusercontent.com/Swizec/server-side-d3-poc/master/src/data.csv")
  .row(this.rowParse)
  .get(data =>
      ReactDOM.hydrate(<App data={data} />, document.getElementById('root'))
  );
//registerServiceWorker();
