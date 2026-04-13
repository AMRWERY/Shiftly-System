<template>
  <div class="flex flex-col bg-[#0B0E14] rounded-xl border border-gray-800/40 overflow-hidden">

    <!-- Top Header Bar Skeleton -->
    <div class="flex items-center justify-between px-6 py-3.5 border-b border-gray-800/40">
      <div class="flex items-center gap-2">
        <!-- Badge slots (e.g. LIVE DEPLOYMENT, M 80) -->
        <div class="h-5 w-32 animate-pulse rounded-full bg-emerald-500/10 border border-emerald-500/20" />
        <div class="h-5 w-12 animate-pulse rounded-full bg-gray-800/80" />
      </div>
      <div class="flex items-center gap-4">
        <div class="h-3 w-36 animate-pulse rounded-full bg-gray-800" />
        <div class="h-7 w-20 animate-pulse rounded-lg bg-gray-800/70" />
      </div>
    </div>

    <!-- Table Head Skeleton -->
    <div class="border-b border-gray-800/60 px-6 py-5 flex items-center gap-6 bg-[#0B0E14]/95">
      <div class="w-4 h-4 rounded bg-gray-800/60 animate-pulse flex-shrink-0" />
      <div v-for="(w, i) in colWidths" :key="i" :class="w" class="h-2 animate-pulse rounded-full bg-gray-800/60" />
      <div class="ms-auto h-2 w-8 animate-pulse rounded-full bg-gray-800/50" />
    </div>

    <!-- Table Rows Skeleton -->
    <div class="relative divide-y divide-gray-800/20">
      <div v-for="row in rows" :key="row" class="flex items-center gap-6 px-6 py-4"
        :style="{ animationDelay: `${(row - 1) * 60}ms` }">
        <!-- Checkbox -->
        <div class="w-4 h-4 rounded bg-gray-800/40 animate-pulse flex-shrink-0" />

        <!-- Avatar + Name -->
        <div class="flex items-center gap-3 flex-shrink-0 w-44">
          <div class="w-10 h-10 rounded-full bg-gray-800/70 animate-pulse flex-shrink-0" />
          <div class="flex flex-col gap-1.5 flex-1">
            <div class="h-3 w-24 rounded-full bg-gray-800 animate-pulse" />
            <div class="h-2 w-16 rounded-full bg-gray-800/50 animate-pulse" />
          </div>
        </div>

        <!-- Role badge -->
        <div class="h-5 w-20 animate-pulse rounded-full bg-gray-800/60" />

        <!-- Remaining cells -->
        <div v-for="(w, i) in cellWidths" :key="i" :class="w" class="h-3 animate-pulse rounded-full bg-gray-800/50" />

        <!-- Actions -->
        <div class="ms-auto flex items-center gap-1.5">
          <div class="w-8 h-8 rounded-lg bg-gray-800/40 animate-pulse" />
          <div class="w-8 h-8 rounded-lg bg-gray-800/40 animate-pulse" />
          <div class="w-8 h-8 rounded-lg bg-gray-800/40 animate-pulse" />
        </div>
      </div>

      <!-- Loading State Label -->
      <div class="absolute bottom-3 start-6 flex items-center gap-2 pointer-events-none">
        <div class="w-0.5 h-4 rounded-full bg-indigo-500/40" />
        <span class="text-[10px] font-bold tracking-widest text-gray-700">
          Background Initialization
        </span>
        <span class="text-[10px] text-gray-800 normal-case tracking-normal font-normal">
          (LOADING STATE)
        </span>
      </div>
    </div>

    <!-- Footer Pagination Skeleton -->
    <div
      class="px-8 py-4 border-t border-gray-800/40 bg-[#0D1017] flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="h-3 w-44 animate-pulse rounded-full bg-gray-800" />
      <div class="flex items-center gap-2">
        <div class="h-9 w-20 animate-pulse rounded-lg bg-gray-800" />
        <div v-for="i in 3" :key="i" class="h-9 w-9 animate-pulse rounded-lg bg-gray-800/60" />
        <div class="h-9 w-20 animate-pulse rounded-lg bg-gray-800" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    rows?: number
  }>(),
  { rows: 7 }
)

const colWidths = ['w-32', 'w-16', 'w-20', 'w-16', 'w-14', 'w-10', 'w-24']
const cellWidths = ['w-20', 'w-16', 'w-14', 'w-10', 'w-24']
</script>