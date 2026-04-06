<template>
  <div class="chart-area">
    <!-- Area chart — integrate with ApexCharts or Chart.js -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  series?: { name: string; data: number[] }[]
  categories?: string[]
  height?: number
}>()
</script>
