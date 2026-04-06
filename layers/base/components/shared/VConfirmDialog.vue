<template>
  <VModal v-model="modelValue" :title="title" size="sm" @update:model-value="$emit('update:modelValue', $event)">
    <p class="v-confirm-message">{{ message }}</p>
    <template #footer>
      <div class="v-confirm-actions">
        <VButton variant="ghost" @click="$emit('update:modelValue', false)">
          {{ cancelLabel }}
        </VButton>
        <VButton :variant="dangerous ? 'danger' : 'primary'" :loading="loading" @click="$emit('confirm')">
          {{ confirmLabel }}
        </VButton>
      </div>
    </template>
  </VModal>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  dangerous?: boolean
  loading?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()
</script>
