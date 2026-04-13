<template>
  <LazyVFormWrapper class="employee-form" @submit="$emit('submit', formData)">
    <slot :form-data="formData" />
    <div class="employee-form-actions">
      <LazyVButton type="submit" variant="primary" :loading="loading">
        {{ submitLabel }}
      </LazyVButton>
    </div>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
  submitLabel?: string
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
