<template>
  <div class="attendance-calendar">
    <!-- Attendance calendar grid -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  employeeId?: string
  month?: string
}>()
</script>
