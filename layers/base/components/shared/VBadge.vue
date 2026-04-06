<template>
  <span class="v-badge" :class="`ui-badge--${variant}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}>()
</script>
