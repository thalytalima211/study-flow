import { reactive } from 'vue'

export const courseStore = reactive({
  lista: []
})

export function addCourse(nome, cor) {
  courseStore.lista.push({
    id: Date.now(),
    nome,
    cor
  })
}

export function removeCourse(id) {
  courseStore.lista = courseStore.lista.filter(c => c.id !== id)
}