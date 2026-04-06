<template>
  <div class="flex items-center gap-3">
    <!-- Prev Button -->
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
      class="p-2 px-3 rounded-lg border border-gray-800 hover:bg-gray-800/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-sm font-semibold text-gray-300">
      <icon name="heroicons:chevron-left" class="w-4 h-4 rtl:rotate-180" />
      {{ t('btn.previous') }}
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center -space-s-px">
      <template v-for="page in visiblePages" :key="page">
        <span v-if="page === '...'" class="text-gray-700 px-2 select-none">...</span>
        <button v-else @click="changePage(page as number)" :class="[
          'w-10 h-10 flex items-center justify-center text-sm font-bold transition-all border border-transparent',
          currentPage === page
            ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/30 rounded-lg scale-110 z-10'
            : 'text-gray-500 hover:text-white'
        ]">
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="p-2 px-3 rounded-lg border border-gray-800 hover:bg-gray-800/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-sm font-semibold text-gray-300">
      {{ t('btn.next') }}
      <icon name="heroicons:chevron-right" class="w-4 h-4 rtl:rotate-180" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisiblePages: {
    type: Number,
    default: 4
  }
});

const emit = defineEmits(['page-change']);

const { t } = useI18n();

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const half = Math.floor(props.maxVisiblePages / 2);
  let start = Math.max(props.currentPage - half, 1);
  let end = Math.min(start + props.maxVisiblePages - 1, props.totalPages);
  if (end - start < props.maxVisiblePages - 1) {
    start = Math.max(end - props.maxVisiblePages + 1, 1);
  }
  if (start > 1) pages.push(1);
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < props.totalPages - 1) pages.push('...');
  if (end < props.totalPages) pages.push(props.totalPages);
  return pages;
});

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && newPage !== props.currentPage) {
    emit('page-change', newPage);
  }
};
</script>