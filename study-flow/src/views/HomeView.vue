<template>
  <main class="container my-4">
    <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addCourseModal">
      Adicionar disciplina
    </button>
    <CourseForm/>

    <section aria-label="Disciplinas e Tarefas" class="row">
      <CourseList />
    </section>
  </main>
</template>

<script setup>
import CourseList from '@/components/CourseList.vue'
import CourseForm from '@/components/CourseForm.vue';
</script>