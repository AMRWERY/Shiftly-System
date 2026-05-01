<template>
  <div role="status" class="inline-flex justify-center items-center gap-2" :class="$attrs.class">
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
});
</script>