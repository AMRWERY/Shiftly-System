<template>
  <div class="attendance-calendar">
    <!-- Attendance calendar grid -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  employeeId?: string
  month?: string
}>()
</script>
