<template>
  <div>
    <button @click="handleReload" :disabled="isLoading"
      class="flex items-center justify-center space-s-2 px-4 py-2 text-brand-primary rounded-full bg-transparent border border-brand-primary/30 hover:bg-brand-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">
      <icon v-if="!isLoading" name="flowbite:refresh-outline" class="w-4 h-4" />
      <icon v-else name="svg-spinners:90-ring-with-bg" class="w-4 h-4 animate-spin" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isLoading?: boolean;
}>();

const emit = defineEmits(['refresh']);

const handleReload = () => {
  if (!props.isLoading) {
    emit('refresh');
  }
};
</script>