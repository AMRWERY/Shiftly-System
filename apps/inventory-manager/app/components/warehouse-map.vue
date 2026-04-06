<template>
  <div class="warehouse-map">
    <!-- Warehouse layout visualization -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  warehouseId?: string
  zones?: { id: string; label: string; x: number; y: number; w: number; h: number }[]
}>()
</script>
