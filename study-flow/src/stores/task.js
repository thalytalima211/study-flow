import { reactive, watch } from 'vue'

const STORAGE_KEY = 'studyflow-tasks'

const tasksSaved = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || '[]'
)

export const taskStore = reactive({
  list: tasksSaved
})

watch(
  () => taskStore.list,
  (newList) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newList)
    )
  },
  { deep: true }
)

export function addTask(task) {
  taskStore.list.push({
    id: Date.now(),
    ...task
  })
}

export function updateTask(id, updatedTask) {
  const task = taskStore.list.find(
    task => task.id === id
  )

  if (!task) return

  Object.assign(task, updatedTask)
}

export function removeTask(id) {
  taskStore.list = taskStore.list.filter(
    task => task.id !== id
  )
}

export function toggleTask(id) {
  const task = taskStore.list.find(
    task => task.id === id
  )

  if (!task) return

  task.completed = !task.completed
}