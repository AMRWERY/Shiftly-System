<template>
  <div class="v-avatar" :class="`ui-avatar--${size}`">
    <img v-if="src" :src="src" :alt="alt" class="v-avatar-img" />
    <span v-else class="v-avatar-initials">{{ initials }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})
</script>
