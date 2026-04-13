<template>
  <div
    class="relative flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0d1117] px-5 py-5 shadow-lg overflow-hidden">
    <!-- Top row: label + icon -->
    <div class="flex items-start justify-between gap-3">
      <p class="text-[11px] font-semibold tracking-widest text-gray-400">
        {{ label }}
      </p>
      <div v-if="icon"
        class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
        <Icon :name="icon" class="h-[18px] w-[18px]" />
      </div>
    </div>

    <!-- Value -->
    <p class="text-[2rem] font-bold leading-none tracking-tight text-white">
      {{ value }}
    </p>

    <!-- Trend + subtitle -->
    <div v-if="trend !== undefined || subtitle" class="flex items-center gap-2">
      <span v-if="trend !== undefined"
        class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold" :class="trend >= 0
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-red-500/10 text-red-400'
          ">
        <Icon :name="trend >= 0
            ? 'heroicons:arrow-trending-up'
            : 'heroicons:arrow-trending-down'
          " class="h-3.5 w-3.5" />
        {{ trend >= 0 ? '+' : '' }}{{ trend }}%
      </span>
      <p v-if="subtitle" class="text-xs text-gray-500">{{ subtitle }}</p>
    </div>

    <!-- Decorative glow -->
    <div class="pointer-events-none absolute -end-6 -top-6 h-24 w-24 rounded-full bg-indigo-600/10 blur-2xl" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  value: string | number
  subtitle?: string
  icon?: string
  trend?: number
}>()
</script>