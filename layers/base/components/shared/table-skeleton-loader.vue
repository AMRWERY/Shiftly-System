<template>
  <div>
    <!-- Controls Skeleton -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
      <!-- Title Skeleton -->
      <div class="h-8 bg-gray-700 rounded-md w-32 animate-pulse"></div>

      <!-- Actions Skeleton -->
      <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
        <!-- Search Input Skeleton -->
        <div class="h-10 bg-gray-700 rounded-md w-full sm:w-[300px] animate-pulse"></div>

        <!-- Download Button Skeleton -->
        <div class="h-10 w-28 bg-gray-700 rounded-md animate-pulse"></div>

        <!-- Refresh Button Skeleton -->
        <div class="h-10 w-10 bg-gray-700 rounded-md animate-pulse"></div>

        <!-- Add Button Skeleton -->
        <div class="h-10 w-32 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
    </div>

    <div class="relative rounded-xl border border-gray-800/40 overflow-hidden bg-[#0B0E14]">
      <div class="scroll-container overflow-x-auto smooth-scroll" @scroll="handleScroll">
        <table class="w-full text-sm text-gray-500 text-start sm:min-w-[1000px]">
          <thead class="bg-[#0B0E14]/95 backdrop-blur-md border-b border-gray-800/60">
            <tr>
              <!-- Selection Checkbox Skeleton -->
              <th scope="col" class="px-6 py-5 w-12">
                <div class="w-5 h-5 bg-gray-800 rounded animate-pulse"></div>
              </th>

              <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 py-5">
                <div class="w-20 h-3 bg-gray-800 rounded-full animate-pulse opacity-60"></div>
              </th>

              <!-- Actions Header Skeleton -->
              <th scope="col" class="px-6 py-5 text-end pe-10">
                <div class="ms-auto w-16 h-3 bg-gray-800 rounded-full animate-pulse opacity-60"></div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800/20">
            <tr v-for="row in rows" :key="row" class="bg-transparent group">
              <!-- Checkbox Cell -->
              <td class="px-6 py-5">
                <div class="w-5 h-5 bg-gray-800/40 rounded animate-pulse"></div>
              </td>

              <td v-for="(header, index) in headers" :key="index" class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <!-- User Avatar Skeleton -->
                  <div v-if="header.key === 'user' || header.key === 'avatar'"
                    class="w-11 h-11 bg-gray-800/60 rounded-full animate-pulse flex-shrink-0"></div>

                  <div class="flex flex-col gap-2 flex-1">
                    <div class="h-3 bg-gray-800 rounded-full animate-pulse" :class="header.loaderWidth || 'w-24'"></div>
                    <div v-if="header.key === 'user'" class="h-2 bg-gray-800/40 rounded-full w-32 animate-pulse"></div>
                  </div>
                </div>
              </td>

              <!-- Actions Cell Skeleton -->
              <td class="px-6 py-5 text-end pe-8">
                <div class="flex justify-end gap-2">
                  <div class="w-9 h-9 bg-gray-800/40 rounded-lg animate-pulse"></div>
                  <div class="w-9 h-9 bg-gray-800/40 rounded-lg animate-pulse"></div>
                  <div class="w-9 h-9 bg-gray-800/40 rounded-lg animate-pulse"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Skeleton -->
    <div
      class="px-8 py-5 border-t border-gray-800/40 flex flex-col sm:flex-row items-center justify-between bg-[#0D1017] animate-pulse">
      <div class="h-4 bg-gray-800 rounded-full w-48 mb-4 sm:mb-0"></div>

      <div class="flex items-center gap-3">
        <!-- Prev Button Skeleton -->
        <div class="w-24 h-10 bg-gray-800 border border-gray-700/50 rounded-lg"></div>
        <!-- Page Numbers -->
        <div class="flex gap-1">
          <div v-for="i in 3" :key="i" class="w-10 h-10 bg-gray-800/50 rounded-lg"></div>
        </div>
        <!-- Next Button Skeleton -->
        <div class="w-24 h-10 bg-gray-800 border border-gray-700/50 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@/types/table-header'

defineProps({
  headers: {
    type: Array as PropType<TableHeader[]>,
    required: true,
    default: () => []
  },
  rows: {
    type: Number,
    default: 9
  }
})

const showLeftShadow = ref(false);
const showRightShadow = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollLeft, scrollWidth, clientWidth } = target;

  showLeftShadow.value = scrollLeft > 0;
  showRightShadow.value = scrollLeft < scrollWidth - clientWidth - 10;
};
</script>

<style scoped>
/* Custom scrollbar styling */
.scroll-container {
  scroll-behavior: smooth;
}

/* Webkit browsers (Chrome, Safari, Edge) */
.scroll-container::-webkit-scrollbar {
  height: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #2e2e48;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 0 6px rgba(102, 126, 234, 0.4);
}

/* Firefox */
.scroll-container {
  scrollbar-color: #6366f1 #2e2e48;
  scrollbar-width: thin;
}

/* Scroll shadows for better visual feedback */
.scroll-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 20;
  transition: opacity 0.3s ease;
}

.scroll-shadow-left {
  left: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.08), transparent);
}

.scroll-shadow-right {
  right: 0;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.08), transparent);
}

/* Smooth scroll behavior */
.smooth-scroll {
  scroll-behavior: smooth;
}

/* Optional: Add a subtle border effect */
.scroll-container {
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>