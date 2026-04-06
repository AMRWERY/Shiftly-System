<template>
  <span class="v-status-dot" :class="`ui-status-dot--${status}`" :title="label">
    <span class="v-status-dot-indicator" />
    <span v-if="showLabel" class="v-status-dot-label">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  status: 'active' | 'inactive' | 'pending' | 'warning' | 'error'
  label?: string
  showLabel?: boolean
}>()
</script>
