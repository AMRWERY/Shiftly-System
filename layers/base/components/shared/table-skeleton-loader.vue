<template>
    <div>
        <!-- Controls Skeleton -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
            <!-- Title Skeleton -->
            <div class="h-8 bg-gray-200 rounded-md w-32 animate-pulse"></div>

            <!-- Actions Skeleton -->
            <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <!-- Search Input Skeleton -->
                <div class="h-10 bg-gray-200 rounded-md w-full sm:w-[300px] animate-pulse"></div>

                <!-- Download Button Skeleton -->
                <div class="h-10 w-28 bg-gray-200 rounded-md animate-pulse"></div>

                <!-- Refresh Button Skeleton -->
                <div class="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>

                <!-- Add Button Skeleton -->
                <div class="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
        </div>

        <div class="relative sm:rounded-lg border overflow-hidden">
            <div class="scroll-container overflow-x-auto smooth-scroll" @scroll="handleScroll">
                <table class="w-full text-sm text-gray-500 text-start">
                <thead class="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr>
                        <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 py-3">
                            <div class="w-24 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row" class="bg-white border-b border-gray-200">
                        <td v-for="(header, index) in headers" :key="index" class="px-6 py-4">
                            <div class="flex items-center space-s-3">
                                <div v-if="header.type === 'image'"
                                    class="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                                <div v-else-if="header.type === 'action'" class="flex gap-3">
                                    <div class="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                                    <div class="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                                </div>
                                <div v-else class="h-4 bg-gray-300 rounded animate-pulse"
                                    :class="header.loaderWidth || 'w-24'"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div v-if="showLeftShadow" class="scroll-shadow scroll-shadow-left"></div>
            <div v-if="showRightShadow" class="scroll-shadow scroll-shadow-right"></div>
        </div>

        <!-- Pagination Skeleton -->
        <div class="flex divide-s-2 divide-gray-100 rounded-lg overflow-hidden w-max my-9 ms-auto animate-pulse">
            <!-- Previous -->
            <div class="px-4 py-2 bg-gray-300 w-24 h-10"></div>
            <!-- Pages -->
            <div class="px-4 py-2 bg-gray-300 w-10 h-10 border-s"></div>
            <div class="px-4 py-2 bg-gray-300 w-10 h-10 border-s"></div>
            <div class="px-4 py-2 bg-gray-300 w-10 h-10 border-s"></div>
            <!-- Next -->
            <div class="px-4 py-2 bg-gray-300 w-20 h-10 border-s"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '../../types/table-header'

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
  background: #f1f5f9;
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
  scrollbar-color: #667eea #f1f5f9;
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