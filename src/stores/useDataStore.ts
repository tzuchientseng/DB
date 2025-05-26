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

        if (!response.ok) throw new Error('Failed to fetch tasks');

        const data = await response.json();

        this.todoTasks = data.todo_data ?? [];
        this.inProgressTasks = data.inProgess_data ?? [];
        this.noteContent = data.note_data ?? '';
        

      } catch (error) {
        console.error('Error fetching:', error);
      }
    },

    async saveTask(): Promise<void> {
      if (!this.token) await this.login();

      const payload = {
        todo_data: this.todoTasks,
        note_data: this.noteContent,
      };

      try {
        let response = await fetch(`${API_BASE_URL}/save-toDoNotes/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 401) {
          console.warn('Token expired or invalid, retrying login...');
          await this.login();
          response = await fetch(`${API_BASE_URL}/save-toDoNotes/`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save: ${response.status} - ${errorText}`);
        }

        console.log("Data saved successfully.");
      } catch (error) {
        console.error(`Failed to save task: ${error instanceof Error ? error.message : error}`, error);
      }
    },

    addTask(task: Task): void {
      this.todoTasks.unshift(task)
    },

    moveToInProgress(task: Task): void {
      this.inProgess_data.unshift(task)
      this.todoTasks.filter(t => JSON.stringify(t) !== JSON.stringify(task))
    },

    removeFromInProgress(task: Task): void {
      this.inProgressTasks = this.inProgressTasks.filter(t => JSON.stringify(t) !== JSON.stringify(task))
    },

    clearInprogress(): void {
      this.inProgressTasks = [];
    },
  },
});

