<template>
  <div class="chart-bar">
    <!-- Bar chart — integrate with ApexCharts or Chart.js -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  series?: { name: string; data: number[] }[]
  categories?: string[]
  height?: number
  horizontal?: boolean
}>()
</script>
