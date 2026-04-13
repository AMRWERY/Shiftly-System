<template>
  <div class="approval-actions">
    <LazyVButton variant="primary" :loading="loading" @click="$emit('approve')">Approve</LazyVButton>
    <LazyVButton variant="danger" :loading="loading" @click="$emit('reject')">Reject</LazyVButton>
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
