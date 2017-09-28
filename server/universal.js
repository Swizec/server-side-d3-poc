const path = require('path')
const fs = require('fs')

const React = require('react')
const {renderToString} = require('react-dom/server')

//const {default: configureStore} = require('../src/store')
//const {default: App} = require('../src/App')

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const markup = renderToString(
        <p>Hello</p>
    );

      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup);
      res.send(RenderedApp)
  })
}
