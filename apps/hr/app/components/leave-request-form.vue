<template>
  <LazyVFormWrapper class="leave-request-form" @submit="$emit('submit', formData)">
    <LazyVSelectInput v-model="formData.type" label="Leave Type" :options="leaveTypes" />
    <LazyVDatePicker v-model="formData.startDate" label="Start Date" disable-past />
    <LazyVDatePicker v-model="formData.endDate" label="End Date" disable-past />
    <LazyVInput v-model="formData.reason" label="Reason" />
    <LazyVButton type="submit" variant="primary" :loading="loading">Submit</LazyVButton>
  </LazyVFormWrapper>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
}>()

defineEmits<{
  submit: [data: Record<string, unknown>]
}>()

const formData = reactive<Record<string, unknown>>({ type: '', startDate: '', endDate: '', reason: '' })

const leaveTypes = [
  { label: 'Annual Leave', value: 'annual' },
  { label: 'Sick Leave', value: 'sick' },
  { label: 'Unpaid Leave', value: 'unpaid' },
]
</script>
