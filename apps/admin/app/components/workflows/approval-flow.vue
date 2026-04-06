<template>
  <div class="approval-flow">
    <div v-for="(step, i) in steps" :key="step.id" class="approval-flow-step">
      <div class="approval-flow-step-indicator" :class="`approval-flow-step-indicator--${step.status}`">
        {{ i + 1 }}
      </div>
      <div class="approval-flow-step-content">
        <p class="approval-flow-step-label">{{ step.label }}</p>
        <p class="approval-flow-step-approver">{{ step.approver }}</p>
        <p class="approval-flow-step-status">{{ step.status }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  steps?: {
    id: string
    label: string
    approver?: string
    status: 'pending' | 'approved' | 'rejected' | 'skipped'
  }[]
}>()
</script>
