<template>
  <form class="journal-entry-form" @submit.prevent="$emit('submit', formData)">
    <slot :form-data="formData" />
    <VButton type="submit" variant="primary" :loading="loading">Post Entry</VButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
