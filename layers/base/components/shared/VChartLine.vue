<template>
  <div class="chart-line">
    <!-- Line chart — integrate with ApexCharts or Chart.js -->
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
