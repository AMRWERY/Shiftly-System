<template>
  <div class="report-builder">
    <!-- Drag-and-drop report builder -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  availableFields?: { key: string; label: string; type: string }[]
}>()
</script>
