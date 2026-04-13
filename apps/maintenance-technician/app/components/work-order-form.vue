<template>
  <LazyVFormWrapper class="work-order-form" @submit="$emit('submit', formData)">
    <slot :form-data="formData" />
    <LazyVButton type="submit" variant="primary" :loading="loading">Save Work Order</LazyVButton>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
  mode?: 'create' | 'edit'
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
