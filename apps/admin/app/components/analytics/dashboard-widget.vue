<template>
  <VCard class="dashboard-widget" :title="title">
    <slot />
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  loading?: boolean
}>()
</script>
