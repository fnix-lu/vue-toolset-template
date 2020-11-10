// const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

const createApp = require('./src/app.js')

server.get('*', (req, res) => {
  const ctx = { url: req.url }
  const app = createApp(ctx)

  renderer.renderToString(app, (err, html) => {
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
