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

