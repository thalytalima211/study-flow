<template>
  <div class="container my-4">

    <!-- Cabeçalho -->
    <div class="mb-4">
      <h1 class="h4 fw-bold mb-1">
        Dashboard
      </h1>

      <p class="text-muted mb-0">
        Acompanhe suas tarefas e seu progresso.
      </p>
    </div>

    <!-- Resumo -->
    <div class="row g-3 mb-4">

      <!-- Total -->
      <div class="col-12 col-md-4">
        <div
          class="card dashboard-card dashboard-card-total border-0 shadow-sm h-100"
        >
          <div class="card-body">
            <p class="text-muted small mb-1">
              Total de tarefas
            </p>

            <p class="display-6 fw-bold mb-0">
              {{ totalTasks }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pendentes -->
      <div class="col-12 col-md-4">
        <div
          class="card dashboard-card dashboard-card-pending border-0 shadow-sm h-100"
        >
          <div class="card-body">
            <p class="text-muted small mb-1">
              Pendentes
            </p>

            <p class="display-6 fw-bold mb-0">
              {{ pendingTasks }}
            </p>
          </div>
        </div>
      </div>

      <!-- Concluídas -->
      <div class="col-12 col-md-4">
        <div
          class="card dashboard-card dashboard-card-completed border-0 shadow-sm h-100"
        >
          <div class="card-body">
            <p class="text-muted small mb-1">
              Concluídas
            </p>

            <p class="display-6 fw-bold mb-0">
              {{ completedTasks }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Filtros -->
    <div class="card dashboard-filter-card border-0 shadow-sm mb-4">
      <div class="card-body">

        <div
          class="d-flex justify-content-between align-items-center mb-3"
        >
          <div>
            <h2 class="h6 fw-bold mb-1">
              Filtros
            </h2>

            <p class="text-muted small mb-0">
              Encontre rapidamente uma tarefa.
            </p>
          </div>

          <button
            v-if="hasFilters"
            type="button"
            class="btn btn-sm btn-light"
            @click="clearFilters"
          >
            Limpar filtros
          </button>
        </div>

        <div class="row g-3">

          <!-- Disciplina -->
          <div class="col-12 col-md-4">
            <label
              for="filterCourse"
              class="form-label small fw-semibold"
            >
              Disciplina
            </label>

            <select
              id="filterCourse"
              v-model="filters.courseId"
              class="form-select"
            >
              <option value="">
                Todas as disciplinas
              </option>

              <option
                v-for="course in courseStore.list"
                :key="course.id"
                :value="course.id"
              >
                {{ course.name }}
              </option>
            </select>
          </div>

          <!-- Status -->
          <div class="col-12 col-md-4">
            <label
              for="filterStatus"
              class="form-label small fw-semibold"
            >
              Status
            </label>

            <select
              id="filterStatus"
              v-model="filters.status"
              class="form-select"
            >
              <option value="">
                Todos
              </option>

              <option value="pending">
                Pendentes
              </option>

              <option value="completed">
                Concluídas
              </option>
            </select>
          </div>

          <!-- Prioridade -->
          <div class="col-12 col-md-4">
            <label
              for="filterPriority"
              class="form-label small fw-semibold"
            >
              Prioridade
            </label>

            <select
              id="filterPriority"
              v-model="filters.priority"
              class="form-select"
            >
              <option value="">
                Todas
              </option>

              <option value="Alta">
                Alta
              </option>

              <option value="Média">
                Média
              </option>

              <option value="Baixa">
                Baixa
              </option>
            </select>
          </div>

        </div>
      </div>
    </div>

    <!-- Lista de tarefas -->
    <div class="card border-0 shadow-sm">

      <!-- Cabeçalho -->
      <div
        class="card-header bg-white border-0 pt-4 px-4
               d-flex justify-content-between align-items-center"
      >
        <div>
          <h2 class="h6 fw-bold mb-1">
            Tarefas
          </h2>

          <p class="text-muted small mb-0">
            {{ filteredTasks.length }}
            {{
              filteredTasks.length === 1
                ? 'tarefa encontrada'
                : 'tarefas encontradas'
            }}
          </p>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="openCreateModal"
        >
          + Adicionar tarefa
        </button>
      </div>

      <!-- Corpo -->
      <div class="card-body px-4">

        <!-- Nenhuma tarefa -->
        <div
          v-if="filteredTasks.length === 0"
          class="text-center text-muted py-5"
        >
          <p class="mb-1">
            Nenhuma tarefa encontrada.
          </p>

          <small>
            Tente alterar os filtros selecionados.
          </small>
        </div>

        <!-- Tarefas -->
        <div
          v-else
          class="list-group list-group-flush"
        >

          <div
            v-for="task in filteredTasks"
            :key="task.id"
            class="list-group-item task-item px-3 py-3"
          >

            <div class="d-flex align-items-start gap-3">

              <!-- Checkbox -->
              <input
                class="form-check-input mt-1"
                type="checkbox"
                :checked="task.completed"
                :aria-label="`Concluir tarefa ${task.title}`"
                @change="toggleTask(task.id)"
              />

              <!-- Conteúdo -->
              <div class="flex-grow-1">

                <div
                  class="d-flex align-items-center
                         gap-2 flex-wrap"
                >

                  <p
                    class="fw-semibold mb-0"
                    :class="{
                      'text-decoration-line-through text-muted':
                        task.completed
                    }"
                  >
                    {{ task.title }}
                  </p>

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

                <p
                  v-if="task.description"
                  class="text-body-secondary small mb-1"
                >
                  {{ task.description }}
                </p>

                <div
                  class="d-flex align-items-center
                         gap-3 flex-wrap"
                >

                  <small class="text-muted">
                    {{ getCourseName(task.courseId) }}
                  </small>

                  <small class="text-muted">
                    {{ formatDate(task.dueDate) }}
                  </small>

                  <small
                    :class="task.completed
                      ? 'text-success'
                      : 'text-muted'"
                  >
                    {{ task.completed ? 'Concluída' : 'Pendente' }}
                  </small>

                </div>

              </div>

              <!-- Ações -->
              <div class="d-flex gap-1">

                <!-- Editar -->
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

                <!-- Excluir -->
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
    </div>

    <!-- Modal de tarefa -->
    <TaskForm
      id="dashboardTaskModal"
      :task="selectedTask"
      :course-id="selectedTask?.courseId ?? null"
      :show-course-select="true"
    />

    <!-- Modal de exclusão -->
    <div
      id="dashboardDeleteTaskModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="dashboardDeleteTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 rounded-4">

          <div class="modal-header border-0 pb-0">

            <h2
              id="dashboardDeleteTaskModalLabel"
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

  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { Modal } from 'bootstrap'

import TaskForm from '@/components/TaskForm.vue'

import { courseStore } from '@/stores/course'

import {
  taskStore,
  toggleTask,
  removeTask
} from '@/stores/task'

const filters = reactive({
  courseId: '',
  status: '',
  priority: ''
})

const selectedTask = ref(null)
const taskToDelete = ref(null)

const totalTasks = computed(() => {
  return taskStore.list.length
})

const pendingTasks = computed(() => {
  return taskStore.list.filter(
    task => !task.completed
  ).length
})

const completedTasks = computed(() => {
  return taskStore.list.filter(
    task => task.completed
  ).length
})

const filteredTasks = computed(() => {
  return taskStore.list.filter(task => {

    const matchesCourse =
      !filters.courseId ||
      String(task.courseId) === String(filters.courseId)

    const matchesStatus =
      !filters.status ||
      (filters.status === 'pending' && !task.completed) ||
      (filters.status === 'completed' && task.completed)

    const matchesPriority =
      !filters.priority ||
      task.priority === filters.priority

    return (
      matchesCourse &&
      matchesStatus &&
      matchesPriority
    )
  })
})

const hasFilters = computed(() => {
  return (
    filters.courseId !== '' ||
    filters.status !== '' ||
    filters.priority !== ''
  )
})

function clearFilters() {
  filters.courseId = ''
  filters.status = ''
  filters.priority = ''
}

function getCourseName(courseId) {
  const course = courseStore.list.find(
    course => String(course.id) === String(courseId)
  )

  return course?.name ?? 'Disciplina não encontrada'
}

function formatDate(date) {
  if (!date) return ''

  return new Date(`${date}T00:00:00`)
    .toLocaleDateString('pt-BR')
}

function openCreateModal() {
  selectedTask.value = null

  const modalElement = document.getElementById(
    'dashboardTaskModal'
  )

  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openEditModal(task) {
  selectedTask.value = task

  const modalElement = document.getElementById(
    'dashboardTaskModal'
  )

  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openDeleteModal(task) {
  taskToDelete.value = task

  const modalElement = document.getElementById(
    'dashboardDeleteTaskModal'
  )

  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function confirmDelete() {
  if (!taskToDelete.value) return

  removeTask(taskToDelete.value.id)

  const modalElement = document.getElementById(
    'dashboardDeleteTaskModal'
  )

  const modal = Modal.getInstance(modalElement)

  modal?.hide()

  taskToDelete.value = null
}
</script>

<style scoped>
.dashboard-card {
  border-radius: 1rem;
}

.dashboard-card-total {
  background-color: #eef2ff;
}

.dashboard-card-pending {
  background-color: #fff7e6;
}

.dashboard-card-completed {
  background-color: #eaf7f2;
}

.dashboard-filter-card {
  background-color: #f5f5f6;
  border-radius: 1rem;
}

.task-item {
  background-color: #fafafa;
  border: 1px solid #eeeeee !important;
  border-radius: 0.75rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.15s ease;
}

.task-item:hover {
  background-color: #f0f0f2;
}

.task-item:last-child {
  margin-bottom: 0;
}
</style>