<template>
  <form class="employee-form" @submit.prevent="$emit('submit', formData)">
    <slot :form-data="formData" />
    <div class="employee-form-actions">
      <VButton type="submit" variant="primary" :loading="loading">
        {{ submitLabel }}
      </VButton>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  submitLabel?: string
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
