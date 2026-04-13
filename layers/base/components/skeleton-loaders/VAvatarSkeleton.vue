<template>
  <div
    class="relative flex-shrink-0 animate-pulse overflow-hidden bg-gray-800/70"
    :class="[sizeClass, shapeClass]"
  >
    <!-- Inner shimmer strip -->
    <div
      class="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-700/60"
      :class="shimmerHeightClass"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    shape?: 'square' | 'circle'
  }>(),
  {
    size: 'md',
    shape: 'square',
  }
)

const sizeClass = computed(() => ({
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
}[props.size]))

const shapeClass = computed(() =>
  props.shape === 'circle' ? 'rounded-full' : 'rounded-xl'
)

const shimmerHeightClass = computed(() => ({
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-2.5',
  xl: 'h-3',
}[props.size]))
</script>
