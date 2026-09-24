<template>
  <div
    class="modal modal-lg fade"
    id="taskModal"
    tabindex="-1"
    aria-labelledby="taskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 rounded-4">

        <div class="modal-header px-4 pt-4 pb-3">
          <div>
            <h2
              id="taskModalLabel"
              class="modal-title fs-5 fw-bold"
            >
              {{ isEditing ? 'Editar tarefa' : 'Nova tarefa' }}
            </h2>

            <p class="text-body-secondary small mb-0 mt-1">
              {{
                isEditing
                  ? 'Atualize as informações da tarefa.'
                  : 'Cadastre uma nova tarefa para organizar seus estudos.'
              }}
            </p>
          </div>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fechar"
          ></button>
        </div>

        <div class="modal-body px-4 pb-4">
          <form @submit.prevent="submit">

            <div class="mb-3">
              <label
                for="taskTitle"
                class="form-label fw-semibold"
              >
                Título
              </label>

              <input
                id="taskTitle"
                v-model="title"
                type="text"
                class="form-control"
                placeholder="Ex.: Trabalho de Compiladores"
                maxlength="100"
                required
              />
            </div>

            <div class="mb-3">
              <label
                for="taskDescription"
                class="form-label fw-semibold"
              >
                Descrição
              </label>

              <textarea
                id="taskDescription"
                v-model="description"
                class="form-control"
                rows="3"
                placeholder="Descreva a tarefa..."
              ></textarea>
            </div>

            <div class="mb-3">
              <label
                for="taskDueDate"
                class="form-label fw-semibold"
              >
                Prazo
              </label>

              <input
                id="taskDueDate"
                v-model="dueDate"
                type="date"
                class="form-control"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="taskPriority"
                class="form-label fw-semibold"
              >
                Prioridade
              </label>

              <select
                id="taskPriority"
                v-model="priority"
                class="form-select"
                required
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              <button
                type="submit"
                class="btn btn-primary px-4"
              >
                {{ isEditing ? 'Salvar alterações' : 'Cadastrar' }}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Modal } from 'bootstrap'

import {
  addTask,
  updateTask
} from '../stores/task'

const props = defineProps({
  task: {
    type: Object,
    default: null
  },

  courseId: {
    type: [String, Number],
    default: null
  }
})

const title = ref('')
const description = ref('')
const dueDate = ref('')
const priority = ref('Média')

const isEditing = computed(() => !!props.task)

watch(
  () => [props.task, props.courseId],
  ([task]) => {
    if (task) {
      title.value = task.title
      description.value = task.description
      dueDate.value = task.dueDate
      priority.value = task.priority
    } else {
      title.value = ''
      description.value = ''
      dueDate.value = ''
      priority.value = 'Média'
    }
  },
  { immediate: true }
)

function submit() {
  const taskData = {
    title: title.value.trim(),
    description: description.value.trim(),
    courseId: props.task?.courseId ?? props.courseId,
    dueDate: dueDate.value,
    priority: priority.value,
    completed: props.task?.completed ?? false
  }

  if (isEditing.value) {
    updateTask(props.task.id, taskData)
  } else {
    addTask(taskData)
  }

  const modalElement = document.getElementById('taskModal')
  const modal = Modal.getInstance(modalElement)

  modal?.hide()
}
</script>