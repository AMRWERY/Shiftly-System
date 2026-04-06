<template>
  <VCard class="employee-card">
    <div class="employee-card-inner">
      <VAvatar :name="employee?.name" :src="employee?.avatarUrl" size="lg" />
      <div class="employee-card-info">
        <p class="employee-card-name">{{ employee?.name }}</p>
        <p class="employee-card-title">{{ employee?.jobTitle }}</p>
        <p class="employee-card-dept">{{ employee?.department }}</p>
      </div>
    </div>
    <slot />
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  employee?: {
    id: string
    name: string
    jobTitle?: string
    department?: string
    avatarUrl?: string
  }
}>()
</script>
