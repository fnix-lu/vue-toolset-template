<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">{{ `${todo.id} - ${todo.title}` }}</li>
    </ul>
    <ul>
      <li>{{ '2020-10-12 13:51:00' | beforeNow }}</li>
      <li>{{ '2020-10-12 13:30:00' | beforeNow }}</li>
      <li>{{ '2020-10-12 9:00' | beforeNow }}</li>
      <li>{{ '2020-10-9' | beforeNow }}</li>
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
