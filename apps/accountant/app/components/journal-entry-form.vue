<template>
  <LazyVFormWrapper class="journal-entry-form" @submit="$emit('submit', formData)">
    <slot :form-data="formData" />
    <LazyVButton type="submit" variant="primary" :loading="loading">Post Entry</LazyVButton>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
