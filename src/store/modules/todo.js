// import { getTodoList } from '@/api/todo'

const state = {
  todoList: []
}

const mutations = {
  SET_TODO_LIST: (state, todoList) => {
    state.todoList = todoList
  }
}

const actions = {
  setTodoList ({ commit }) {
    commit('SET_TODO_LIST', [1, 2, 3])

    /* return getTodoList().then(res => {
      commit('SET_TODO_LIST', res.data)
    }) */
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
