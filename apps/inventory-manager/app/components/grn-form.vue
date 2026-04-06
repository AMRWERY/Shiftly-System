<template>
  <form class="grn-form" @submit.prevent="$emit('submit', formData)">
    <!-- Goods Receipt Note form -->
    <slot :form-data="formData" />
    <VButton type="submit" variant="primary" :loading="loading">Confirm Receipt</VButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  purchaseOrderId?: string
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
