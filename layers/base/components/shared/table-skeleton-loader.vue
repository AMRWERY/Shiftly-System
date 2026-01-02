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

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        default: 5
    }
})
</script>