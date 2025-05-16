import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/' // `npm run deploy`
const API_URL = 'api/';

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

export const useTodoStore = defineStore('todo', {
  state: (): ToDoState => ({
    token: null,
    todoTasks: [],
    inProgressTasks: [],
    noteContent: ''
  }),

  actions: {
    async login(): Promise<void> {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'sunny', password: 'open' })
      })
      if (!res.ok) throw new Error('Login failed')
      const data = await res.json()
      this.token = data.access
    },

    async fetchTasks(): Promise<void> {
      if (!this.token) await this.login()

      let res = await fetch(`${API_BASE_URL}/get-toDoNotes/`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })

      if (res.status === 401) {
        await this.login()
        res = await fetch(`${API_BASE_URL}/get-toDoNotes/`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
      }

      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()

      this.todoTasks = data.todo_data ?? []
      this.noteContent = data.note_data ?? ''
      this.inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks') || '[]')
    },

    async saveTasks(): Promise<void> {
      if (!this.token) await this.login()

      const payload = {
        todo_data: this.todoTasks,
        note_data: this.noteContent
      }

      let res = await fetch(`${API_BASE_URL}/save-toDoNotes/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (res.status === 401) {
        await this.login()
        return this.saveTasks()
      }

      if (!res.ok) {
        const error = await res.text()
        throw new Error(`Failed to save: ${error}`)
      }

      localStorage.setItem('inProgressTasks', JSON.stringify(this.inProgressTasks))
    },

    addTask(task: Task): void {
      this.todoTasks.unshift(task)
    },

    moveToInProgress(task: Task): void {
      this.inProgressTasks.unshift(task)
      this.todoTasks = this.todoTasks.filter(t => JSON.stringify(t) !== JSON.stringify(task))
      localStorage.setItem('inProgressTasks', JSON.stringify(this.inProgressTasks))
    },

    removeFromInProgress(task: Task): void {
      this.inProgressTasks = this.inProgressTasks.filter(t => JSON.stringify(t) !== JSON.stringify(task))
      localStorage.setItem('inProgressTasks', JSON.stringify(this.inProgressTasks))
    },

    clearInProgress(): void {
      this.inProgressTasks = []
      localStorage.removeItem('inProgressTasks')
    }
  }
})

