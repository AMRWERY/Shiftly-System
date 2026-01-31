<template>
  <div>
    <div class="max-w-6xl mx-auto space-y-6 animate-pulse">
      <!-- Header Skeleton -->
      <div class="bg-white rounded-xl shadow border p-8 space-y-4">
        <div class="flex justify-between items-start gap-6">
          <div class="flex-1 space-y-3">
            <div class="h-8 w-64 bg-gray-200 rounded"></div>
            <div class="h-5 w-40 bg-gray-200 rounded"></div>
            <div class="h-4 w-full max-w-md bg-gray-200 rounded"></div>
          </div>

          <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
        </div>

        <!-- Stats Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
          <div
            v-for="i in 3"
            :key="i"
            class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div class="h-12 w-12 bg-gray-200 rounded-lg"></div>
            <div class="space-y-2 flex-1">
              <div class="h-4 w-24 bg-gray-200 rounded"></div>
              <div class="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Permissions Matrix Skeleton -->
      <div class="bg-white rounded-xl shadow border p-6 space-y-4">
        <div class="h-6 w-48 bg-gray-200 rounded"></div>

        <div class="space-y-3">
          <div
            v-for="i in 6"
            :key="i"
            class="h-10 w-full bg-gray-100 rounded"
          ></div>
        </div>
      </div>

      <!-- Users List Skeleton -->
      <div class="bg-white rounded-xl shadow border p-6 space-y-6">
        <div class="h-6 w-56 bg-gray-200 rounded"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="i in 6"
            :key="i"
            class="flex items-center gap-4 p-4 border rounded-lg"
          >
            <div class="h-10 w-10 bg-gray-200 rounded-full"></div>

            <div class="flex-1 space-y-2">
              <div class="h-4 w-32 bg-gray-200 rounded"></div>
              <div class="h-3 w-40 bg-gray-200 rounded"></div>
            </div>

            <div class="h-5 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>