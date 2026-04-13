<template>
  <LazyVCard class="dashboard-widget" :title="title">
    <slot />
  </LazyVCard>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  loading?: boolean
}>()
</script>
