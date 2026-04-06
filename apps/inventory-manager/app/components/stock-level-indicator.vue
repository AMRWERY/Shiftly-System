<template>
  <div class="stock-level-indicator">
    <div class="stock-level-indicator-bar">
      <div
        class="stock-level-indicator-fill"
        :class="levelClass"
        :style="{ width: `${levelPercent}%` }"
      />
    </div>
    <span class="stock-level-indicator-label">{{ current }} / {{ maximum }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number
  minimum: number
  maximum: number
}>()

const levelPercent = computed(() => Math.min((props.current / props.maximum) * 100, 100))

const levelClass = computed(() => {
  if (props.current <= props.minimum) return 'stock-level-indicator-fill--critical'
  if (props.current <= props.minimum * 1.5) return 'stock-level-indicator-fill--low'
  return 'stock-level-indicator-fill--ok'
})
</script>
