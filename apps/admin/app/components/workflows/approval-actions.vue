<template>
  <div class="approval-actions">
    <VButton variant="primary" :loading="loading" @click="$emit('approve')">Approve</VButton>
    <VButton variant="danger" :loading="loading" @click="$emit('reject')">Reject</VButton>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean
}>()

defineEmits<{
  approve: []
  reject: []
}>()
</script>
