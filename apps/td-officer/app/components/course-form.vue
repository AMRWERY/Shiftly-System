<template>
  <form class="course-form" @submit.prevent="$emit('submit', formData)">
    <slot :form-data="formData" />
    <VButton type="submit" variant="primary" :loading="loading">Save Course</VButton>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  mode?: 'create' | 'edit'
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({})
</script>
