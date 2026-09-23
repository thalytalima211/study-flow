<template>
  <header class="navbar navbar-dark bg-dark px-3">
    <span class="navbar-brand mb-0 h1">StudyFlow</span>
  </header>

  <main class="container my-4">

    <section aria-label="Disciplinas e Tarefas" class="row mt-4">
      <CourseList />
    </section>
  </main>
</template>

<script setup>
import CourseList from '@/components/CourseList.vue'
</script>