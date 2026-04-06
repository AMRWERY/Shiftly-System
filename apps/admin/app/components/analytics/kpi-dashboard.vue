<template>
  <div class="kpi-dashboard">
    <div class="kpi-dashboard-grid">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  columns?: number
}>()
</script>
