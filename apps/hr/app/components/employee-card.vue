<template>
  <LazyVCard class="employee-card">
    <div class="employee-card-inner">
      <LazyVAvatar :name="employee?.name" :src="employee?.avatarUrl" size="lg" />

      <div class="employee-card-info">
        <p class="employee-card-name">{{ employee?.name }}</p>
        <p class="employee-card-title">{{ employee?.jobTitle }}</p>
        <p class="employee-card-dept">{{ employee?.department }}</p>
      </div>
    </div>
    <slot />
  </LazyVCard>
</template>

<script lang="ts" setup>
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