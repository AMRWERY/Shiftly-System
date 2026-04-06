<template>
  <div class="kpi-dashboard">
    <div class="kpi-dashboard-grid">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns?: number
}>()
</script>
