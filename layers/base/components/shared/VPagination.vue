<template>
  <div class="flex flex-col sm:flex-row items-center gap-4"
    :class="{ 'w-full justify-between': totalItems !== undefined }">
    <!-- Pagination Details -->
    <div v-if="totalItems !== undefined && startIndex != null && endIndex != null"
      class="text-xs text-gray-600 font-medium mb-3 sm:mb-0">
      {{ summaryText }}
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center gap-3">
      <!-- Prev Button -->
      <LazyVButton variant="outline" border-color="border-gray-800" text-color="text-gray-300"
        hover-color="hover:bg-gray-800/50" padding-x="px-3" padding-y="py-2" :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)">
        <Icon name="heroicons:chevron-left" class="w-4 h-4 rtl:rotate-180" />
      </LazyVButton>

      <!-- Page Numbers -->
      <div class="flex items-center -space-s-px">
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="text-gray-700 px-2 select-none">...</span>
          <div v-else
            class="w-10 h-10 flex items-center justify-center font-medium transition-all text-sm cursor-pointer select-none"
            :class="currentPage === page ? 'text-indigo-400 bg-indigo-600/10 border border-indigo-500/30 rounded-lg scale-110 z-10' : 'text-gray-500 hover:text-white'"
            @click="changePage(page as number)">
            {{ page }}
          </div>
        </template>
      </div>

      <!-- Next Button -->
      <LazyVButton variant="outline" border-color="border-gray-800" text-color="text-gray-300"
        hover-color="hover:bg-gray-800/50" padding-x="px-3" padding-y="py-2" :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)">
        <Icon name="heroicons:chevron-right" class="w-4 h-4 rtl:rotate-180" />
      </LazyVButton>
    </div>
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
  totalItems: {
    type: Number,
    required: false,
  },
  startIndex: {
    type: Number,
    required: false,
  },
  endIndex: {
    type: Number,
    required: false,
  },
})

const emit = defineEmits(['page-change'])
const { t, te } = useI18n()

const summaryText = computed(() => {
  const start = props.startIndex
  const end = props.endIndex
  const total = props.totalItems
  if (total === undefined || start == null || end == null) return ''
  if (te('pagination.range')) {
    return t('pagination.range', { start, end, total })
  }
  return `Showing ${start} – ${end} of ${total} entries`
})

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