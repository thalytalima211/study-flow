<template>
  <div>
    <button
      type="button"
      class="btn btn-success mb-3"
      @click="openCreateModal"
    >
      Adicionar disciplina
    </button>

    <CourseForm :course="selectedCourse" />

    <TaskForm
      :task="selectedTask"
      :course-id="selectedCourseId"
    />

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2 class="h6 mb-1">Disciplinas</h2>
        <p class="text-muted small mb-0">
          Organize suas tarefas por disciplina.
        </p>
      </div>
    </div>

    <div
      v-if="courseStore.list.length === 0"
      class="text-center text-muted py-5"
    >
      <p class="mb-1">Nenhuma disciplina cadastrada ainda.</p>
      <small>
        Cadastre uma disciplina para começar a organizar seus estudos.
      </small>
    </div>

    <div v-else class="row g-3">
      <div
        v-for="d in courseStore.list"
        :key="d.id"
        class="col-12 col-md-6 col-xl-4"
      >
        <div class="card h-100 border-0 shadow-sm">

          <div
            class="card-header border-0 d-flex justify-content-between align-items-center"
            :style="{ backgroundColor: d.color }"
          >
            <h3 class="h6 text-white mb-0 text-truncate">
              {{ d.name }}
            </h3>

            <div class="d-flex gap-1 ms-2">
              <button
                type="button"
                class="btn btn-sm btn-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Editar disciplina"
                @click="openEditModal(d)"
              >
                ✎
                <span class="visually-hidden">
                  Editar disciplina
                </span>
              </button>

              <button
                type="button"
                class="btn btn-sm btn-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Excluir disciplina"
                @click="openDeleteModal(d)"
              >
                ×
                <span class="visually-hidden">
                  Excluir disciplina
                </span>
              </button>

            </div>
          </div>

          <TaskList :course-id="d.id" />
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteCourseModal"
      tabindex="-1"
      aria-labelledby="deleteCourseModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 rounded-4">

          <div class="modal-header border-0 pb-0">
            <h2
              id="deleteCourseModalLabel"
              class="modal-title fs-5 fw-bold"
            >
              Excluir disciplina
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
              Tem certeza que deseja excluir a disciplina
              <strong>{{ courseToDelete?.name }}</strong>?
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
import { ref, nextTick } from 'vue'
import { Modal } from 'bootstrap'

import TaskList from '@/components/TaskList.vue'
import CourseForm from '@/components/CourseForm.vue'
import TaskForm from '@/components/TaskForm.vue'

import { courseStore, removeCourse } from '@/stores/course'

const selectedCourse = ref(null)
const courseToDelete = ref(null)

async function openEditModal(course) {
  selectedCourse.value = course

  await nextTick()

  const modalElement = document.getElementById('courseModal')
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openCreateModal() {
  selectedCourse.value = null

  const modalElement = document.getElementById('courseModal')
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function openDeleteModal(course) {
  courseToDelete.value = course

  const modalElement = document.getElementById('deleteCourseModal')
  const modal = Modal.getOrCreateInstance(modalElement)

  modal.show()
}

function confirmDelete() {
  if (!courseToDelete.value) return

  removeCourse(courseToDelete.value.id)

  const modalElement = document.getElementById('deleteCourseModal')
  const modal = Modal.getInstance(modalElement)

  modal?.hide()

  courseToDelete.value = null
}
</script>