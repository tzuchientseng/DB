<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import { useDataStore } from '@/stores/useDataStore.ts'

const dataStore = useDataStore()

onMounted(() => { dataStore.fetchData() })

function moveTask(params: any): void {
  void params // 假裝使用，避免報錯
}

function update(params: any): void {
  void params
}


</script>

<template>
  <h1>
    test
  </h1>
<!-- <ul class="list-group" id="todo-list">
  <TaskItem
    v-for="(task, index) in dataStore.todoTasks"
    :key="'todo-' + index"
    :task="task"
    :index="index"
    @move="moveTask(task, 'todo')"
    @update="updateTask(dataStore.todoTasks, index, $event)"
  />
</ul>

<ul class="list-group" id="in-progress-list">
  <TaskItem
    v-for="(task, index) in dataStore.inProgressTasks"
    :key="'inprogress-' + index"
    :task="task"
    :index="index"
    @move="moveTask(task, 'inProgress')"
    @update="updateTask(dataStore.inProgressTasks, index, $event)"
  />
</ul> -->
</template>

