<template>
  <div
    class="relative flex flex-col items-center text-center rounded-2xl border border-gray-800/50 bg-[#0d1117] px-8 py-10 overflow-hidden"
  >
    <!-- Left accent bar (opt-in) -->
    <div
      v-if="accentBorder"
      class="absolute start-0 top-0 h-full w-[3px] rounded-s-2xl"
      :class="accentBarClass"
    />

    <!-- Icon badge -->
    <div
      class="mb-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
      :class="iconBgClass"
    >
      <Icon :name="icon" class="h-7 w-7" :class="iconColorClass" />
    </div>

    <!-- Title -->
    <h3 class="mb-3 text-base font-bold leading-snug text-white">
      {{ title }}
    </h3>

    <!-- Description -->
    <p v-if="description" class="mb-8 max-w-[220px] text-sm leading-relaxed text-gray-500">
      {{ description }}
    </p>

    <!-- Actions slot or prop-driven buttons -->
    <div class="mt-auto w-full space-y-3">
      <slot>
        <button
          v-if="primaryLabel"
          class="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98]"
          :class="primaryBtnClass"
          @click="$emit('primary')"
        >
          <Icon v-if="primaryIcon" :name="primaryIcon" class="h-4 w-4" />
          {{ primaryLabel }}
        </button>

        <button
          v-if="secondaryLabel"
          class="w-full text-[11px] font-bold tracking-widest transition-colors"
          :class="secondaryBtnClass"
          @click="$emit('secondary')"
        >
          {{ secondaryLabel }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Color = 'gray' | 'green' | 'blue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    color?: Color
    accentBorder?: boolean
    primaryLabel?: string
    primaryIcon?: string
    secondaryLabel?: string
  }>(),
  {
    icon: 'tabler:database',
    color: 'gray',
    accentBorder: false,
  }
)

defineEmits<{
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

const iconBgClass = computed(() => ({
  gray:  'bg-gray-700/50',
  green: 'bg-emerald-500/15',
  blue:  'bg-blue-500/15',
}[props.color]))

const iconColorClass = computed(() => ({
  gray:  'text-gray-300',
  green: 'text-emerald-400',
  blue:  'text-blue-400',
}[props.color]))

const accentBarClass = computed(() => ({
  gray:  'bg-gray-600',
  green: 'bg-emerald-500',
  blue:  'bg-blue-500',
}[props.color]))

const primaryBtnClass = computed(() => ({
  gray:  'border border-gray-700 text-gray-200 hover:bg-gray-800/80',
  green: 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20',
  blue:  'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20',
}[props.color]))

const secondaryBtnClass = computed(() => ({
  gray:  'text-gray-500 hover:text-gray-300',
  green: 'text-emerald-500 hover:text-emerald-400',
  blue:  'text-blue-400 hover:text-blue-300',
}[props.color]))
</script>
