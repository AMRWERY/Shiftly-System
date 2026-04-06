<template>
  <VCard class="v-kpi-card">
    <div class="v-kpi-card-inner">
      <div class="v-kpi-card-content">
        <p class="v-kpi-card-label">{{ label }}</p>
        <p class="v-kpi-card-value">{{ value }}</p>
        <p v-if="subtitle" class="v-kpi-card-subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="icon" class="v-kpi-card-icon">
        <Icon :name="icon" />
      </div>
    </div>
    <div v-if="trend !== undefined" class="v-kpi-card-trend" :class="trend >= 0 ? 'ui-kpi-card-trend--up' : 'ui-kpi-card-trend--down'">
      <Icon :name="trend >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'" />
      <span>{{ Math.abs(trend) }}%</span>
    </div>
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  subtitle?: string
  icon?: string
  trend?: number
}>()
</script>
