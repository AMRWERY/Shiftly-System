<template>
  <div>
    <div class="p-6">
      <!-- Back Button Skeleton -->
      <div class="mb-6">
        <div class="flex items-center gap-2 w-24">
          <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Header Card Skeleton -->
        <div
          class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6"
        >
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Avatar Skeleton -->
            <div class="relative">
              <div
                class="w-32 h-32 bg-gray-200 rounded-full animate-pulse"
              ></div>
              <div
                class="absolute bottom-2 right-2 w-6 h-6 bg-gray-300 rounded-full border-4 border-white animate-pulse"
              ></div>
            </div>

            <div class="text-center md:text-left flex-1 w-full">
              <!-- Name and Date Skeleton -->
              <div
                class="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-4"
              >
                <div class="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>

              <!-- Contact Info Skeleton -->
              <div
                class="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
              >
                <div
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg"
                >
                  <div class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
                <div
                  class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg"
                >
                  <div class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-3 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>

              <!-- Badges Skeleton -->
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <div
                  class="h-7 bg-gray-200 rounded-full w-20 animate-pulse"
                ></div>
                <div
                  class="h-7 bg-gray-200 rounded-full w-16 animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Grid Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Employment Details Card Skeleton -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <!-- Header -->
            <div class="mb-6 pb-2 border-b border-gray-50">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-gray-100 rounded-lg">
                  <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
            </div>

            <!-- Detail Items -->
            <div class="space-y-4">
              <div
                class="flex justify-between items-center"
                v-for="i in 3"
                :key="`emp-${i}`"
              >
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Personal Info Card Skeleton -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <!-- Header -->
            <div class="mb-6 pb-2 border-b border-gray-50">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-gray-100 rounded-lg">
                  <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>

            <!-- Detail Items -->
            <div class="space-y-4">
              <div
                class="flex justify-between items-center"
                v-for="i in 3"
                :key="`personal-${i}`"
              >
                <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>