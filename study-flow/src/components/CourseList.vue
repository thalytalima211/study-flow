<template>
  <div>
    <h2 class="h6 mb-3">Disciplinas</h2>
    <p v-if="courseStore.list.length === 0" class="text-muted">
      Nenhuma disciplina cadastrada ainda.
    </p>
    <div class="d-flex flex-wrap gap-2 row">
      <span
        v-for="d in courseStore.list"
        :key="d.id"
        class="card col-6"
        :style="{ backgroundColor: d.color }">
        <div class="card-header d-flex justify-content-between align-items-center">
          <p class="card-title mb-0 text-white">{{ d.name }}</p>
          <div class="">
            <button
              class="btn-close btn-close-white"
              style="font-size: 0.6rem"
              @click="removeCourse(d.id)"
            ></button>
          </div>
        </div>
        <div class="card-body bg-white">
          <p class="card-text">
            Sem tarefas cadastradas ainda.
          </p>
        </div>
      </span>
    </div>
  </div>
</template>

<script setup>
import { courseStore, removeCourse } from '../stores/course'
</script>
