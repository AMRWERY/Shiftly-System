<template>
  <div
    class="relative flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0d1117] px-5 py-5 shadow-lg overflow-hidden">
    <!-- Top row: label + icon -->
    <div class="flex items-start justify-between gap-3">
      <div class="h-2.5 w-28 animate-pulse rounded-full bg-gray-800" />
      <div class="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-gray-800/60" />
    </div>

    <!-- Value -->
    <div class="h-8 w-24 animate-pulse rounded-lg bg-gray-800" />

    <!-- Trend + subtitle -->
    <div class="flex items-center gap-2">
      <div class="h-5 w-14 animate-pulse rounded-md bg-gray-800/60" />
      <div class="h-3 w-24 animate-pulse rounded-full bg-gray-800/40" />
    </div>

    <!-- Decorative glow (same as real card for visual consistency) -->
    <div class="pointer-events-none absolute -end-6 -top-6 h-24 w-24 rounded-full bg-indigo-600/5 blur-2xl" />
  </div>
</template>

<script lang="ts" setup>

</script>