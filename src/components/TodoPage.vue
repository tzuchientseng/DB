<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/useDataStore'

const dataStore = useDataStore()

onMounted(() => {
  dataStore.fetchData()
})
</script>

<template>
  <!---->
  <!-- <ul> -->
  <!--   <li v-for="(task, i) in dataStore.todoTasks" :key="i"> -->
  <!--     {{ task.todo }} -->
  <!--   </li> -->
  <!---->
  <!--   <li v-for="(items, i) in dataStore.inProgressTasks" :key="i"> -->
  <!--     {{ items.todo }} -->
  <!--   </li> -->
  <!-- </ul> -->
  <!-- {{ dataStore.noteContent }} -->
  <!---->

  <div class="hidden-content">
    <h1 id="main-title" class="display-2 text-white text-center custom-mt">To-Do List</h1>
  </div>

</template>
<style scoped>
</style

