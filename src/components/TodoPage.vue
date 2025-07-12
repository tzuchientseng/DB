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
  <h1 class="display-6 text-center custom-mt">To-Do List</h1>
  <div class="container">
    <div id="todo-container">
      <div class="row g-3">
        <div class="col-md-6 col-12">
          <div class="card-header bg-primary text-white">Note Completed</div>
          <div class="card-body todo-container">
            <ul class="list-group">
              <!-- To-do items will be displayed here -->
              <TaskItem
                v-for="(task, index) in dataStore.todoTasks"
                :key="'todo-' + index"
                :task="task"
                :index="index"
                @move="moveTask(task, 'todo')"
                @update="updateTask(dataStore.todoTasks, index, $event)"
              /> 
            </ul>
          </div>
          <div class="card-footer">
            <button class="btn btn-success w-100">Add Task</button>
          </div>
        </div>

        <div class="col-md-6 col-12">
          <div class="card-header bg-success text-white">In Progress</div>
          <div class="card-body in-progress-container">
            <!-- In-progress items will be displayed here -->
            <ul class="list-group" id="in-progress-list">
              <TaskItem
                v-for="(task, index) in dataStore.inProgressTasks"
                :key="'inprogress-' + index"
                :task="task"
                :index="index"
                @move="moveTask(task, 'inProgress')"
                @update="updateTask(dataStore.inProgressTasks, index, $event)"
              />
            </ul>
          </div>
          <div class="card-footer">
            <button class="btn btn-danger w-100 ">Clear Tasks</button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scope>
html,
body {
  height: 100%;
  overflow: hidden;
}

.custom-mt {
  margin-top: 1rem;
}
</style>

