<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Swal from 'sweetalert2'

const props = defineProps<{
  task: {
    goal: string
    purpose: string
    todo: string
    timing: string
  }
  isInProgress: boolean
}>()

const emit = defineEmits(['moveTask', 'updateTask'])

function handleButtonClick() {
  emit('moveTask')
}

async function handleEdit() {
  const initial = `${props.task.goal}, ${props.task.purpose}, ${props.task.todo}, ${props.task.timing}`

  const result = await Swal.fire({
    title: 'Edit Task',
    input: 'text',
    inputPlaceholder: 'Goal, Purpose, Todo, Timing',
    inputValue: initial,
    showCancelButton: true,
    confirmButtonText: 'Save',
    inputValidator: (value) => {
      const values = value.split(',')
      if (values.length !== 4) return 'Please enter 4 values separated by commas'
      return null
    }
  })

  if (result.value) {
    const [goal, purpose, todo, timing] = result.value.split(',')
    emit('updateTask', {
      goal: goal.trim(),
      purpose: purpose.trim(),
      todo: todo.trim(),
      timing: timing.trim()
    })
  }
}
</script>

<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :data-task-data="JSON.stringify(task)"
    @dblclick="handleEdit"
  >
    <div>
      <strong>Goal:</strong> {{ task.goal }}<br />
      <strong>Purpose:</strong> {{ task.purpose }}<br />
      <strong>Todo:</strong> {{ task.todo }}<br />
      <strong>Timing:</strong> {{ task.timing }}
    </div>

    <button
      class="btn btn-sm"
      :class="isInProgress ? 'btn-outline-danger' : 'btn-outline-success'"
      @click.stop="handleButtonClick"
    >
      {{ isInProgress ? 'Complete' : 'In Progress' }}
    </button>
  </li>
</template>
