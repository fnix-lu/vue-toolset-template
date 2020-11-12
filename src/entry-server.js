import createApp from './app.js'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()

  router.push(context.url)

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()

    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }

    Promise.all(matchedComponents.map(component => {
      if (component.asyncData) {
        return component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      context.state = store.state
      resolve(app)
    }).catch(reject)
  }, reject)
})
