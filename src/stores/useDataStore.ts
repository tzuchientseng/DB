import { defineStore } from 'pinia'

// const API_BASE_URL = 'https://home.sunnytseng.com/api' // Deploy to server
const API_BASE_URL = '/api'

export interface Task {
  goal: string
  purpose: string
  todo: string
  timing: string
}

export interface DataState {
  token: string | null
  todoTasks: Task[]
  inProgressTasks: Task[]
  noteContent: string
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    token: null,
    todoTasks: [],
    inProgressTasks: [],
    noteContent: '',
  }),

  // getters: {},

  actions: {
    async login(): Promise<void> {
      const loginData = { username: "sunny", password: "open" }
      try {
        const response = await fetch(`${API_BASE_URL}/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        })
        if (!response.ok) {
          const text = await response.text();
          console.log("Login request failed:", response.status, text);
          return;
        }
        const data = await response.json();
        this.token = data.access;
      } catch (error) {
        console.error("Login Error:", error);
      }
    },

    async fetchData(): Promise<void> {
      try {
        if (!this.token) await this.login();

        let response = await fetch(`${API_BASE_URL}/get-toDoNotes/`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.status === 401) {
          await this.login();
          response = await fetch(`${API_BASE_URL}/get-toDoNotes/`, {
            headers: { Authorization: `Bearer ${this.token}` }
          });
        }

        if (!response.ok) throw new Error('Failed to fetch data!');

        const data = await response.json();

        this.todoTasks = data.todo_data ?? [];
        this.inProgressTasks = data.in_progress_data ?? [];
        this.noteContent = data.note_data ?? '';

      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
  }
});


