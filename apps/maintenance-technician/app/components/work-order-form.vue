<template>
  <form class="work-order-form" @submit.prevent="$emit('submit', formData)">
    <slot :form-data="formData" />
    <VButton type="submit" variant="primary" :loading="loading">Save Work Order</VButton>
  </form>
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
