<template>
  <form class="leave-request-form" @submit.prevent="$emit('submit', formData)">
    <VSelect v-model="formData.type" label="Leave Type" :options="leaveTypes" />
    <VDatePicker v-model="formData.startDate" label="Start Date" />
    <VDatePicker v-model="formData.endDate" label="End Date" />
    <VInput v-model="formData.reason" label="Reason" />
    <VButton type="submit" variant="primary" :loading="loading">Submit</VButton>
  </form>
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
