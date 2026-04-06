<template>
  <tr class="transaction-row">
    <td>{{ transaction?.date }}</td>
    <td>{{ transaction?.description }}</td>
    <td>{{ transaction?.reference }}</td>
    <td :class="transaction?.amount >= 0 ? 'text-green-600' : 'text-red-600'">
      {{ transaction?.amount }}
    </td>
    <td><VStatusDot :status="transaction?.status" :label="transaction?.status" show-label /></td>
    <slot />
  </tr>
</template>

<script lang="ts" setup>
defineProps<{
  transaction?: {
    id: string
    date: string
    description: string
    reference?: string
    amount: number
    status: 'active' | 'inactive' | 'pending' | 'warning' | 'error'
  }
}>()
</script>
