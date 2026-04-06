<template>
  <div class="report-builder">
    <!-- Drag-and-drop report builder -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  availableFields?: { key: string; label: string; type: string }[]
}>()
</script>
