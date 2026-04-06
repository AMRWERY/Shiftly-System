<template>
  <div class="payslip-preview">
    <div class="payslip-header">
      <h2>Payslip</h2>
      <p>{{ payslip?.period }}</p>
    </div>
    <div class="payslip-body">
      <slot :payslip="payslip" />
    </div>
    <div class="payslip-footer">
      <p class="payslip-net">Net Pay: {{ payslip?.netPay }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  payslip?: {
    period?: string
    grossPay?: number
    deductions?: number
    netPay?: number
  }
}>()
</script>
