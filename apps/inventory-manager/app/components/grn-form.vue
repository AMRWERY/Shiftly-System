<template>
  <LazyVFormWrapper class="grn-form" @submit="$emit('submit', formData)">
    <!-- Goods Receipt Note form -->
    <slot :form-data="formData" />
    <LazyVButton type="submit" variant="primary" :loading="loading">Confirm Receipt</LazyVButton>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
  purchaseOrderId?: string
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
