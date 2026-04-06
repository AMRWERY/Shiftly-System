<template>
  <form class="performance-review-form" @submit.prevent="$emit('submit', formData)">
    <slot :form-data="formData" />
    <VButton type="submit" variant="primary" :loading="loading">Submit Review</VButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  employeeId?: string
  cycleId?: string
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
