<template>
  <VButton
    type="button"
    variant="outline"
    border-color="border-brand-primary/30"
    text-color="text-brand-primary"
    hover-color="hover:bg-brand-primary/10"
    padding-x="px-4"
    padding-y="py-2"
    class="rounded-full shadow-sm"
    :disabled="isLoading"
    @click="handleReload"
  >
    <icon v-if="!isLoading" name="flowbite:refresh-outline" class="w-4 h-4" />
    <icon v-else name="svg-spinners:90-ring-with-bg" class="w-4 h-4 animate-spin" />
  </VButton>
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
