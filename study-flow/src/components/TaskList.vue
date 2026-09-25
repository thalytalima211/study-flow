<template>
  <div class="card-body">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <p class="text-muted small mb-1">
          Tarefas
        </p>

        <p class="fw-semibold mb-0">
          {{ pendingTasks.length }}
          {{ pendingTasks.length === 1 ? 'tarefa pendente' : 'tarefas pendentes' }}
        </p>
      </div>

      <span
        v-if="courseTasks.length === 0"
        class="badge text-bg-light"
      >
        Sem tarefas
      </span>
    </div>

    <div
      v-if="pendingTasks.length > 0"
      class="list-group list-group-flush"
    >
      <div
        v-for="task in pendingTasks"
        :key="task.id"
        class="list-group-item px-0"
      >
        <div class="d-flex align-items-start gap-2">

          <input
            class="form-check-input mt-1"
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id)"
          />

          <div class="flex-grow-1">

            <p class="mb-0 fw-semibold">
              {{ task.title }}
            </p>

            <p
              v-if="task.description"
              class="text-body-secondary small mb-0"
            >
              {{ task.description }}
            </p>

            <div class="d-flex align-items-center gap-2">

              <small class="text-muted">
                {{ formatDate(task.dueDate) }}
              </small>

              <span
                class="badge"
                :class="{
                  'text-bg-danger': task.priority === 'Alta',
                  'text-bg-warning': task.priority === 'Média',
                  'text-bg-success': task.priority === 'Baixa'
                }"
              >
                {{ task.priority }}
              </span>

            </div>
          </div>

          <!-- Ações -->
          <div class="d-flex gap-1">

            <button
              type="button"
              class="btn btn-sm btn-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Editar tarefa"
              @click="openEditModal(task)"
            >
              ✎
              <span class="visually-hidden">
                Editar tarefa
              </span>
            </button>

            <button
              type="button"
              class="btn btn-sm btn-light"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Excluir tarefa"
              @click="openDeleteModal(task)"
            >
              ×
              <span class="visually-hidden">
                Excluir tarefa
              </span>
            </button>

          </div>

        </div>
      </div>
    </div>

    <div
      v-if="completedTasks.length > 0"
      class="border-top my-3 pt-3"
    >
      <p class="text-muted small fw-semibold mb-2">
        Concluídas
      </p>

      <div class="list-group list-group-flush">
        <div
          v-for="task in completedTasks"
          :key="task.id"
          class="list-group-item px-0"
        >
          <div class="d-flex align-items-start gap-2">

            <input
              class="form-check-input mt-1"
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task.id)"
            />

            <div class="flex-grow-1">

              <p
                class="mb-0 fw-semibold text-muted text-decoration-line-through"
              >
                {{ task.title }}
              </p>

              <p
                v-if="task.description"
                class="text-body-secondary small mb-0"
              >
                {{ task.description }}
              </p>

              <div class="d-flex align-items-center gap-2">

                <small class="text-muted">
                  {{ formatDate(task.dueDate) }}
                </small>

                <span class="badge text-bg-light">
                  {{ task.priority }}
                </span>

              </div>
            </div>

            <div class="d-flex gap-1">

              <button
                type="button"
                class="btn btn-sm btn-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Editar tarefa"
                @click="openEditModal(task)"
              >
                ✎
                <span class="visually-hidden">
                  Editar tarefa
                </span>
              </button>

              <button
                type="button"
                class="btn btn-sm btn-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Excluir tarefa"
                @click="openDeleteModal(task)"
              >
                ×
                <span class="visually-hidden">
                  Excluir tarefa
                </span>
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-sm btn-outline-primary w-100 mt-3"
      @click="openCreateModal"
    >
      + Adicionar tarefa
    </button>

  </div>

  <TaskForm
    :id="taskModalId"
    :task="selectedTask"
    :course-id="courseId"
  />

  <div
    class="modal fade"
    :id="deleteModalId"
    tabindex="-1"
    :aria-labelledby="`${deleteModalId}-label`"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content border-0 rounded-4">

        <div class="modal-header border-0 pb-0">
          <h2
            :id="`${deleteModalId}-label`"
            class="modal-title fs-5 fw-bold"
          >
            Excluir tarefa
          </h2>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fechar"
          ></button>
        </div>

        <div class="modal-body pt-3">
          <p class="mb-2">
            Tem certeza que deseja excluir a tarefa
            <strong>{{ taskToDelete?.title }}</strong>?
          </p>

          <p class="text-body-secondary small mb-0">
            Essa ação não poderá ser desfeita.
          </p>
        </div>

        <div class="modal-footer border-0 pt-0">
          <button
            type="button"
            class="btn btn-light"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDelete"
          >
            Excluir
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Modal } from 'bootstrap'

import TaskForm from '@/components/TaskForm.vue'

import {
  taskStore,
  removeTask,
  toggleTask
} from '@/stores/task'

const props = defineProps({
  courseId: {
    type: [String, Number],
    required: true
  }
})

const selectedTask = ref(null)
const taskToDelete = ref(null)

const taskModalId = `taskModal-${props.courseId}`
const deleteModalId = `deleteTaskModal-${props.courseId}`

const courseTasks = computed(() => {
  return taskStore.list.filter(
    task => task.courseId === props.courseId
  )
})

const pendingTasks = computed(() => {
  return courseTasks.value.filter(
    task => !task.completed
  )
})

const completedTasks = computed(() => {
  return courseTasks.value.filter(
    task => task.completed
  )
})

function formatDate(date) {
  if (!date) return ''

  return new Date(`${date}T00:00:00`)
    .toLocaleDateString('pt-BR')
}

function openCreateModal() {
  selectedTask.value = null

  const modalElement = document.getElementById(taskModalId)
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openEditModal(task) {
  selectedTask.value = task

  const modalElement = document.getElementById(taskModalId)
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openDeleteModal(task) {
  taskToDelete.value = task

  const modalElement = document.getElementById(deleteModalId)
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function confirmDelete() {
  if (!taskToDelete.value) return

  removeTask(taskToDelete.value.id)

  const modalElement = document.getElementById(deleteModalId)
  const modal = Modal.getInstance(modalElement)

  modal?.hide()

  taskToDelete.value = null
}
</script>