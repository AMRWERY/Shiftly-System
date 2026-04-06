<template>
  <div class="v-card" :class="{ 'ui-card--padded': padded }">
    <div v-if="$slots.header || title" class="v-card-header">
      <slot name="header">
        <h3 class="v-card-title">{{ title }}</h3>
      </slot>
    </div>
    <div class="v-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="v-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  padded?: boolean
}>()
</script>
