<template>
  <LazyVCard class="pm-schedule-card">
    <p class="pm-schedule-card-title">{{ schedule?.title }}</p>
    <p class="pm-schedule-card-asset">{{ schedule?.assetName }}</p>
    <p class="pm-schedule-card-frequency">{{ schedule?.frequency }}</p>
    <p class="pm-schedule-card-next">Next due: {{ schedule?.nextDue }}</p>
    <slot />
  </LazyVCard>
</template>

<script lang="ts" setup>
defineProps<{
  schedule?: {
    id: string
    title?: string
    assetName?: string
    frequency?: string
    nextDue?: string
  }
}>()
</script>
