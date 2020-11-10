const createApp = require('./app.js')

module.exports = context => {
  const { app } = createApp()
  return app
}
