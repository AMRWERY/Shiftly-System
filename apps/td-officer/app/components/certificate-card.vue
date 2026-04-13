<template>
  <LazyVCard class="certificate-card">
    <p class="certificate-card-title">{{ certificate?.name }}</p>
    <p class="certificate-card-employee">{{ certificate?.employeeName }}</p>
    <p class="certificate-card-issued">Issued: {{ certificate?.issuedDate }}</p>
    <p class="certificate-card-expires">Expires: {{ certificate?.expiryDate ?? 'Never' }}</p>
    <slot />
  </LazyVCard>
</template>

<script lang="ts" setup>
defineProps<{
  certificate?: {
    id: string
    name?: string
    employeeName?: string
    issuedDate?: string
    expiryDate?: string
  }
}>()
</script>
