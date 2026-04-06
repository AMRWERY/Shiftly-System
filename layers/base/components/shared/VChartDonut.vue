<template>
  <div class="chart-donut">
    <!-- Donut chart — integrate with ApexCharts or Chart.js -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  series?: number[]
  labels?: string[]
  height?: number
}>()
</script>
