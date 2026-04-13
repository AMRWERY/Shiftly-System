<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="v-drawer-overlay" @click.self="$emit('update:modelValue', false)">
        <div class="v-drawer" :class="`ui-drawer--${position}`">
          <div class="v-drawer-header">
            <slot name="header">
              <h2 v-if="title" class="v-drawer-title">{{ title }}</h2>
            </slot>
            <LazyVButton class="v-drawer-close" type="button" variant="ghost" padding-x="px-1" padding-y="py-1"
              @click="$emit('update:modelValue', false)">
              <Icon name="heroicons:x-mark" />
            </LazyVButton>
          </div>
          <div class="v-drawer-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="v-drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean
  title?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
