<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import { useDataStore } from '@/stores/useDataStore'

const dataStore = useDataStore()

onMounted(() => {
  dataStore.fetchData()
  const stored = localStorage.getItem('inProgressTasks')
  if (stored) dataStore.inProgressTasks = JSON.parse(stored)
})

function moveTask(task: any, from: 'todo' | 'inProgress') {
  if (from === 'todo') {
    dataStore.todoTasks = dataStore.todoTasks.filter(t => t !== task)
    dataStore.inProgressTasks.unshift(task)
  } else {
    dataStore.inProgressTasks = dataStore.inProgressTasks.filter(t => t !== task)
  }
  localStorage.setItem('inProgressTasks', JSON.stringify(dataStore.inProgressTasks))
}

function updateTask(list: any[], index: number, updated: any) {
  list[index] = updated
}
</script>

<template>

    <h1 id="main-title" class="display-2 text-white text-center custom-mt">To-Do List</h1>
    <div id="main-content" class="container">
        <div id="todo-container">
            <div class="row g-3">
                <div class="col-md-6 col-12">
                    <div class="card flex-grow-1">
                        <div class="card-header bg-primary text-white">Not Completed</div>
                        <div class="card-body todo-container">
                            <ul class="list-group" id="todo-list">
                                <!-- To-do items will be displayed here -->
                                <ul class="list-group" id="todo-list">
                                  <!-- <li v-for="(task, index) in dataStore.todoTasks" :key="'todo-' + index" class="list-group-item"> -->
                                  <!--   <strong>Goal:</strong> {{ task.goal }}<br> -->
                                  <!--   <strong>Purpose:</strong> {{ task.purpose }}<br> -->
                                  <!--   <strong>Todo:</strong> {{ task.todo }}<br> -->
                                  <!--   <strong>Timing:</strong> {{ task.timing }} -->
                                  <!-- </li> -->
                                  <TaskItem />
                                </ul>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success w-100 task-control hidden" id="add-task">Add Task</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="card flex-grow-1">
                        <div class="card-header bg-success text-white">In Progress</div>
                        <div class="card-body in-progress-container">
                            <ul class="list-group" id="in-progress-list">
                                <!-- In-progress items will be displayed here -->
                            </ul>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger w-100 task-control hidden" id="clear-in-progress">Clear Tasks</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-12 d-flex justify-content-center">
            <button class="btn btn-outline-secondary w-25 mt-1" id="note">Notebook</button>
            <button class="btn btn-outline-warning w-25 mt-1 ms-3" id="save-tasks">Save</button>
        </div>
    </div>

</template>

