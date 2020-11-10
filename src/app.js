const Vue = require('vue')
const App = require('./App.vue')

const createApp = () => {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}

module.exports = createApp
