import { reactive, watch } from 'vue'

const STORAGE_KEY = 'studyflow-courses'

export const courseColors = [
  '#E63946', 
  '#F3722C',
  '#D99A00', 
  '#43AA8B', 
  '#00A878', 
  '#277DA1',
  '#4361EE',
  '#7209B7',
  '#C2185B',
  '#6A4C93' 
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

export function updateCourse(id, name, color) {
  const course = courseStore.list.find(course => course.id === id)

  if (!course) return

  course.name = name
  course.color = color
}