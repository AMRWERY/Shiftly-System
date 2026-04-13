<template>
  <span
    class="inline-flex items-center justify-center rounded-xl px-4 py-1.5 text-sm font-bold leading-none select-none"
    :class="variantClass">
    <slot>{{ label }}</slot>
  </span>
</template>

<script lang="ts" setup>
type Variant =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'rejected'
  | 'approved'
  | 'processing'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    label?: string
  }>(),
  { variant: 'neutral' }
)

const variantClass = computed(() => ({
  active: 'bg-green-700 text-green-100',
  approved: 'bg-green-700 text-green-100',
  success: 'bg-green-700 text-green-100',
  inactive: 'bg-gray-700/60 text-gray-300 border border-gray-600/60',
  neutral: 'bg-gray-700/60 text-gray-300 border border-gray-600/60',
  pending: 'bg-amber-700 text-amber-100',
  warning: 'bg-amber-700 text-amber-100',
  rejected: 'bg-red-700 text-red-100',
  danger: 'bg-red-700 text-red-100',
  processing: 'bg-indigo-700/80  text-indigo-200',
  info: 'bg-indigo-700/80  text-indigo-200',
}[props.variant]))
</script>