<template>
  <div role="status" class="inline-flex justify-center items-center gap-2" :class="$attrs.class">
    <Icon :name="iconName" :class="[sizeClass, color]" />
    <span v-if="text" :class="textColor">{{ text }}</span>
    <span v-else class="sr-only">Loading...</span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

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
    default: 'svg-spinners:270-ring-with-bg',
  },
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-6 w-6';
    case 'lg':
      return 'h-12 w-12';
    case 'xl':
      return 'h-16 w-16';
    case 'md':
    default:
      return 'h-8 w-8';
  }
});
</script>