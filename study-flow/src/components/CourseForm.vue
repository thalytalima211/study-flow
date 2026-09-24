<template>
  <div
    class="modal fade"
    id="courseModal"
    tabindex="-1"
    aria-labelledby="courseModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 rounded-4 overflow-hidden">

        <div class="modal-header px-4 pt-4 pb-3">
          <div>
            <h2 id="courseModalLabel" class="modal-title fs-5 fw-bold">
              {{ isEditing ? 'Editar disciplina' : 'Nova disciplina' }}
            </h2>

            <p class="text-body-secondary small mb-0 mt-1">
              {{
                isEditing
                  ? 'Atualize as informações da disciplina.'
                  : 'Cadastre uma disciplina para organizar seus estudos.'
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

            <div class="mb-4">
              <label for="courseName" class="form-label fw-semibold">
                Nome da disciplina
              </label>

              <input
                id="courseName"
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Ex.: Programação Web"
                maxlength="60"
                required
              />
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold mb-1">
                Cor da disciplina
              </label>

              <p class="text-body-secondary small mb-3">
                Escolha uma cor para identificar visualmente a disciplina.
              </p>

              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="colorOption in courseColors"
                  :key="colorOption"
                  type="button"
                  class="color-option rounded-3"
                  :class="{ selected: color === colorOption }"
                  :style="{ backgroundColor: colorOption }"
                  :aria-label="`Selecionar cor ${colorOption}`"
                  :aria-pressed="color === colorOption"
                  @click="color = colorOption"
                >
                  <span
                    v-if="color === colorOption"
                    class="text-white fw-bold"
                  >
                    ✓
                  </span>
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 pt-2">
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
import { addCourse, updateCourse, courseColors } from '../stores/course'

const props = defineProps({
  course: {
    type: Object,
    default: null
  }
})

const name = ref('')
const color = ref(courseColors[0])

const isEditing = computed(() => !!props.course)

import { Modal } from 'bootstrap'

watch(
  () => props.course,
  (course) => {
    if (course) {
      name.value = course.name
      color.value = course.color
    } else {
      name.value = ''
      color.value = courseColors[0]
    }
  },
  { immediate: true }
)

function submit() {
  if (isEditing.value) {
    updateCourse(
      props.course.id,
      name.value.trim(),
      color.value
    )
  } else {
    addCourse(
      name.value.trim(),
      color.value
    )
  }

  const modalElement = document.getElementById('courseModal')
  const modal = Modal.getInstance(modalElement)

  modal?.hide()
}
</script>

<style scoped>
.color-option {
  width: 38px;
  height: 38px;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.color-option:hover {
  transform: translateY(-2px);
}

.color-option.selected {
  border-color: #1b263b;
  box-shadow: 0 0 0 2px #fff;
}

.course-preview {
  min-height: 48px;
  display: flex;
  align-items: center;
}
</style>