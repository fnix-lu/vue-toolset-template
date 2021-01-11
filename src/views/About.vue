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
    <input
      type="text"
      v-for="(c, i) in chars"
      :key="i"
      v-model="chars[i]"
    >
  </div>
</template>

<script>
import { getTodoList } from '@/api/todo'

export default {
  data() {
    return {
      todoList: [],
      chars: new Array(4)
    }
  },
  watch: {
    chars(val) {
      console.log(val)
    }
  },
  created() {
    getTodoList().then(res => {
      this.todoList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.about {
  color: $color-primary;
}
</style>
