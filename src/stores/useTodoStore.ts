import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/' // `npm run deploy`
const API_URL = 'api/';


const API_BASE_URL = 'https://home.sunnytseng.com/api'

export interface Task {
  goal: string
  purpose: string
  todo: string
  timing: string
}

export interface ToDoState {
  token: string | null
  todoTasks: Task[]
  inProgressTasks: Task[]
  noteContent: string
}

