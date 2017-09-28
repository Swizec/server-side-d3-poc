const path = require('path');
const fs = require('fs');

const React = require('react');
const {renderToString} = require('react-dom/server');

//const {default: configureStore} = require('../src/store')
const {default: App} = require('../src/App');

const csvFilePath = path.resolve(__dirname, '..', 'src', 'data.csv');
const csvparse = require('csv-parse');

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData)=>{
        if (err) {
            console.error('read err', err);
            return res.status(404).end();
        }

        fs.readFile(csvFilePath, (err, raw) => {
            csvparse(raw, {columns: true, trim: true}, (err, data) => {
                const markup = renderToString(
                    <App data={data} />
                );

                const RenderedApp = htmlData.replace('{{SSR}}', markup);
                res.send(RenderedApp)
            });
        });
    });
}
