<template>
  <span class="v-badge" :class="`ui-badge--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}>()
</script>
