<template>
  <LazyVButton type="button" variant="outline" border-color="border-brand-primary/30" text-color="text-brand-primary"
    hover-color="hover:bg-brand-primary/10" padding-x="px-3" padding-y="py-3" :rounded="'rounded-full'" class="shadow-sm"
    :disabled="isLoading" @click="handleReload">
    <Icon v-if="!isLoading" name="flowbite:refresh-outline" class="w-4 h-4" />
    <LazyVLoadingSpinner v-else size="sm" color="text-brand-primary" icon-name="svg-spinners:90-ring-with-bg" />
  </LazyVButton>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits(['refresh'])

const handleReload = () => {
  if (!props.isLoading) emit('refresh')
}
</script>