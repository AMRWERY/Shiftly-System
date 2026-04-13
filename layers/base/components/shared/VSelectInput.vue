<template>
  <div class="v-select-wrapper">
    <label v-if="label" :for="id" class="v-select-label">{{ label }}</label>
    <select
      :id="id"
      :disabled="disabled"
      :value="modelValue"
      class="v-select"
      v-bind="$attrs"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <p v-if="error" class="v-select-error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id?: string
  label?: string
  placeholder?: string
  modelValue?: string | number
  options?: { label: string; value: string | number }[]
  disabled?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
