import Vue from 'vue'
import createApp from './app.js'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  },

  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[index] !== component))
    })

    if (!activated.length) {
      return next()
    }

    Promise.all(activated.map(component => {
      if (component.asyncData) {
        return component.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
