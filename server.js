const path = require('path')

const express = require('express')
const server = express()

const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

server.use('/source', express.static(path.join(__dirname, './dist/client')))

server.get('*', (req, res) => {
  const ctx = { url: req.url, title: 'Title A' }

  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8018, () => {
  console.log('Server is running at: http://localhost:8018')
})
