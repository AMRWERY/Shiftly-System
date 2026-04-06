<template>
  <VCard class="dashboard-widget" :title="title">
    <slot />
  </VCard>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  loading?: boolean
}>()
</script>
