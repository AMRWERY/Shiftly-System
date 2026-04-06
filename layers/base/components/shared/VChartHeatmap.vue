<template>
  <div class="chart-heatmap">
    <!-- Heatmap chart — integrate with ApexCharts or Chart.js -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  series?: { name: string; data: { x: string; y: number }[] }[]
  height?: number
}>()
</script>
