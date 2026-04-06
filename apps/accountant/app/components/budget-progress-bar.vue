<template>
  <div class="budget-progress-bar">
    <div class="budget-progress-bar-labels">
      <span>{{ label }}</span>
      <span>{{ used }} / {{ total }}</span>
    </div>
    <div class="budget-progress-bar-track">
      <div
        class="budget-progress-bar-fill"
        :class="{ 'budget-progress-bar-fill--over': percentage > 100 }"
        :style="{ width: `${Math.min(percentage, 100)}%` }"
      />
    </div>
    <p class="budget-progress-bar-percent">{{ percentage.toFixed(1) }}%</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string
  used: number
  total: number
}>()

const percentage = computed(() => (props.total > 0 ? (props.used / props.total) * 100 : 0))
</script>
