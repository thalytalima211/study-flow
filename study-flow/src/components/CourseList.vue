<template>
  <div>
    <h2 class="h6 mb-3">Disciplinas</h2>
    <p v-if="courseStore.lista.length === 0" class="text-muted">
      Nenhuma disciplina cadastrada ainda.
    </p>
    <div class="d-flex flex-wrap gap-2">
      <span
        v-for="d in courseStore.lista"
        :key="d.id"
        class="badge d-flex align-items-center gap-2 p-2"
        :style="{ backgroundColor: d.cor }"
      >
        {{ d.nome }}
        <button class="btn-close btn-close-white" style="font-size: 0.6rem;" @click="removeCourse(d.id)"></button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { courseStore, removeCourse } from '../store/course'
</script>