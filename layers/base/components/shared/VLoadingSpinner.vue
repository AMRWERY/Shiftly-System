<template>
  <div role="status" class="inline-flex justify-center items-center gap-2" :class="$attrs.class">
    <Icon :name="iconName" :class="[sizeClass, color]" />
    <span v-if="text" :class="textColor">{{ text }}</span>
    <span v-else class="sr-only">{{ t('btn.loading') }}</span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const { t } = useI18n()

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'text-blue-400',
  },
  text: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: 'text-gray-500',
  },
  iconName: {
    type: String,
    default: 'svg-spinners:180-ring-with-bg',
  },
});

const sizeClasses: Record<string, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

const sizeClass = computed(() => sizeClasses[props.size] ?? sizeClasses.md)
</script>
