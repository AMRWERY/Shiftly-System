<template>
  <div class="v-loading-skeleton" :class="`ui-loading-skeleton--${variant}`" :style="{ height, width }">
    <div class="v-loading-skeleton-shimmer" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'text' | 'rect' | 'circle'
  height?: string
  width?: string
}>()
</script>
