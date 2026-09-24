<template>
  <div class="modal modal-lg fade" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 mb-3">Nova disciplina</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Nome</label>

              <div class="d-flex align-items-center gap-2">
                <input v-model="name" type="text" class="form-control" required/>

                <input v-model="color" type="color" class="form-control form-control-color" title="Escolher cor"/>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100" data-bs-dismiss="modal">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addCourse } from '../store/course'

const name = ref('')
const color = ref('#4f46e5')

function register() {
  addCourse(name.value, color.value)
  name.value = ''
  color.value = '#4f46e5'
}
</script>