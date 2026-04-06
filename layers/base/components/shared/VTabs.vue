<template>
  <div class="v-tabs">
    <div class="v-tabs-nav" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        role="tab"
        :aria-selected="modelValue === tab.key"
        :class="['ui-tabs-tab', { 'ui-tabs-tab--active': modelValue === tab.key }]"
        type="button"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="v-tabs-content">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: { key: string; label: string }[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [key: string]
}>()
</script>
