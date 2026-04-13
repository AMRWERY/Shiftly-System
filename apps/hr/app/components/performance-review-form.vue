<template>
  <LazyVFormWrapper class="performance-review-form" @submit="$emit('submit', formData)">
    <slot :form-data="formData" />
    <LazyVButton type="submit" variant="primary" :loading="loading">Submit Review</LazyVButton>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
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
