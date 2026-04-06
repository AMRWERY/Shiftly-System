<template>
  <VCard class="course-card">
    <img v-if="course?.thumbnail" :src="course.thumbnail" :alt="course.title" class="course-card-thumbnail" />
    <p class="course-card-title">{{ course?.title }}</p>
    <p class="course-card-category">{{ course?.category }}</p>
    <p class="course-card-duration">{{ course?.duration }}</p>
    <slot />
  </VCard>
</template>

<script lang="ts" setup>
defineProps<{
  course?: {
    id: string
    title?: string
    category?: string
    duration?: string
    thumbnail?: string
  }
}>()
</script>
