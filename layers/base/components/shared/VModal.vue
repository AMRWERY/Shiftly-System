<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="v-modal-overlay" @click.self="closeOnBackdrop && $emit('update:modelValue', false)">
        <div class="v-modal" :class="`ui-modal--${size}`">
          <div v-if="$slots.header || title" class="v-modal-header">
            <slot name="header">
              <h2 class="v-modal-title">{{ title }}</h2>
            </slot>
            <button class="v-modal-close" type="button" @click="$emit('update:modelValue', false)">
              <Icon name="heroicons:x-mark" />
            </button>
          </div>
          <div class="v-modal-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="v-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
