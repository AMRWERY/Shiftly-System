<template>
  <div class="flex items-center gap-3">
    <!-- Prev Button -->
    <VButton
      variant="outline"
      border-color="border-gray-800"
      text-color="text-gray-300"
      hover-color="hover:bg-gray-800/50"
      padding-x="px-3"
      padding-y="py-2"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      <icon name="heroicons:chevron-left" class="w-4 h-4 rtl:rotate-180" />
      {{ t('btn.previous') }}
    </VButton>

    <!-- Page Numbers -->
    <div class="flex items-center -space-s-px">
      <template v-for="page in visiblePages" :key="page">
        <span v-if="page === '...'" class="text-gray-700 px-2 select-none">...</span>
        <VButton
          v-else
          variant="ghost"
          :text-color="currentPage === page ? 'text-indigo-400' : 'text-gray-500'"
          padding-x="px-0"
          padding-y="py-0"
          class="w-10 h-10"
          :class="currentPage === page ? 'bg-indigo-600/10 border border-indigo-500/30 rounded-lg scale-110 z-10' : 'hover:text-white'"
          @click="changePage(page as number)"
        >
          {{ page }}
        </VButton>
      </template>
    </div>

    <!-- Next Button -->
    <VButton
      variant="outline"
      border-color="border-gray-800"
      text-color="text-gray-300"
      hover-color="hover:bg-gray-800/50"
      padding-x="px-3"
      padding-y="py-2"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      {{ t('btn.next') }}
      <icon name="heroicons:chevron-right" class="w-4 h-4 rtl:rotate-180" />
    </VButton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 4,
  },
})

const emit = defineEmits(['page-change'])
const { t } = useI18n()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(props.currentPage - half, 1)
  let end = Math.min(start + props.maxVisiblePages - 1, props.totalPages)
  if (end - start < props.maxVisiblePages - 1) {
    start = Math.max(end - props.maxVisiblePages + 1, 1)
  }
  if (start > 1) pages.push(1)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < props.totalPages - 1) pages.push('...')
  if (end < props.totalPages) pages.push(props.totalPages)
  return pages
})

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && newPage !== props.currentPage) {
    emit('page-change', newPage)
  }
}
</script>
