<template>
  <div class="v-file-upload" :class="{ 'ui-file-upload--dragging': isDragging }">
    <label :for="id" class="v-file-upload-label">
      <icon name="heroicons:cloud-arrow-up" class="v-file-upload-icon" />
      <span>{{ label || 'Click or drag files to upload' }}</span>
      <span v-if="accept" class="v-file-upload-hint">{{ accept }}</span>
    </label>
    <input
      :id="id"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="sr-only"
      @change="onFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id?: string
  label?: string
  accept?: string
  multiple?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
}>()

const isDragging = ref(false)

function onFileChange(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  emit('update:modelValue', files)
}
</script>
