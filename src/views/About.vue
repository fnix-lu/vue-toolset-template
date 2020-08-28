<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">{{ `${todo.id} - ${todo.title}` }}</li>
    </ul>
  </div>
</template>

<script>
import { getTodoList } from '@/api/todo'

export default {
  data () {
    return {
      todoList: []
    }
  },
  created () {
    getTodoList().then(res => {
      this.todoList = res.data
    })
  }
}
</script>
