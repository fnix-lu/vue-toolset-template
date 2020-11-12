<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>Todo List: {{ todoList }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  asyncData ({ store, route }) {
    return store.dispatch('todo/setTodoList')
  },
  computed: {
    todoList () {
      return this.$store.state.todo.todoList
    }
  }
}
</script>
