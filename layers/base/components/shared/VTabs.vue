<template>
  <div class="v-tabs">
    <div class="v-tabs-nav" role="tablist">
      <VButton
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        variant="ghost"
        :text-color="modelValue === tab.key ? '' : 'text-gray-400'"
        padding-x="px-4"
        padding-y="py-2"
        :class="['ui-tabs-tab', { 'ui-tabs-tab--active': modelValue === tab.key }]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </VButton>
    </div>
    <div class="v-tabs-content">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tabs: { key: string; label: string }[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [key: string]
}>()
</script>
