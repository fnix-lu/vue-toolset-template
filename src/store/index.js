import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import todo from './modules/todo'

import getters from './getters'

Vue.use(Vuex)

const createStore = () => new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    todo
  },
  getters
})

export default createStore
