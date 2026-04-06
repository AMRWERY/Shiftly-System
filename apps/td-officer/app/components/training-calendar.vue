<template>
  <div class="training-calendar">
    <!-- Training schedule calendar -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  month?: string
  sessions?: { id: string; title: string; date: string; courseId: string }[]
}>()
</script>
