<template>
  <VCard class="work-order-card">
    <div class="work-order-card-header">
      <span class="work-order-card-id">#{{ workOrder?.id }}</span>
      <VStatusDot :status="statusMap[workOrder?.status ?? 'pending']" :label="workOrder?.status" show-label />
    </div>
    <p class="work-order-card-title">{{ workOrder?.title }}</p>
    <p class="work-order-card-asset">{{ workOrder?.assetName }}</p>
    <p class="work-order-card-date">Due: {{ workOrder?.dueDate }}</p>
    <slot />
  </VCard>
</template>

<script lang="ts" setup>
defineProps<{
  workOrder?: {
    id: string
    title?: string
    assetName?: string
    status?: string
    dueDate?: string
  }
}>()

const statusMap: Record<string, 'active' | 'inactive' | 'pending' | 'warning' | 'error'> = {
  open: 'pending',
  'in-progress': 'warning',
  completed: 'active',
  cancelled: 'inactive',
}
</script>
