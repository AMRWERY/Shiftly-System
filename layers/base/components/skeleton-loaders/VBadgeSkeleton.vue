<template>
  <span
    class="inline-block animate-pulse rounded-xl bg-gray-800/80"
    :class="sizeClass"
  />
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' }
)

const sizeClass = computed(() => ({
  sm: 'h-6  w-16',
  md: 'h-8  w-24',
  lg: 'h-9  w-32',
}[props.size]))
</script>
