import { reactive, watch } from 'vue'

const STORAGE_KEY = 'studyflow-courses'

export const courseColors = [
  '#E63946', // 🔴 Vermelho
  '#F3722C', // 🟠 Laranja
  '#D99A00', // 🟡 Amarelo
  '#43AA8B', // 🟢 Verde
  '#00A878', // 🟢 Esmeralda
  '#277DA1', // 🔵 Azul
  '#4361EE', // 🔵 Azul intenso
  '#7209B7', // 🟣 Roxo
  '#C2185B', // 🩷 Rosa
  '#6A4C93'  // 🟣 Roxo azulado
]

const savedCourses = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || '[]'
)

export const courseStore = reactive({
  list: savedCourses
})

watch(
  () => courseStore.list,
  (newList) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newList)
    )
  },
  { deep: true }
)

export function addCourse(name, color) {
  courseStore.list.push({
    id: Date.now(),
    name: name,
    color: color
  })
}

export function removeCourse(id) {
  courseStore.list = courseStore.list.filter(
    c => c.id !== id
  )
}