<template>
  <div class="relative flex-shrink-0 overflow-hidden" :class="[sizeClass, shapeClass, !src ? bgClass : '']">
    <!-- Photo -->
    <img v-if="src" :src="src" :alt="alt || name" class="h-full w-full object-cover" />

    <!-- Initials -->
    <span v-else class="flex h-full w-full select-none items-center justify-center font-bold text-white"
      :class="textSizeClass">
      {{ initials }}
    </span>

    <!-- Online indicator -->
    <span v-if="online" class="absolute bottom-0.5 end-0.5 block rounded-full border-2 border-[#0B0F19] bg-emerald-500"
      :class="dotSizeClass" />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    name?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    shape?: 'square' | 'circle'
    online?: boolean
  }>(),
  {
    size: 'md',
    shape: 'square',
  }
)

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const sizeClass = computed(() => ({
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
}[props.size]))

const shapeClass = computed(() =>
  props.shape === 'circle' ? 'rounded-full' : 'rounded-xl'
)

const textSizeClass = computed(() => ({
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}[props.size]))

const dotSizeClass = computed(() => ({
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
}[props.size]))

// Deterministic warm-toned bg from name
const bgPalette = [
  'bg-amber-800',
  'bg-orange-800',
  'bg-rose-800',
  'bg-indigo-800',
  'bg-teal-800',
  'bg-violet-800',
  'bg-cyan-800',
  'bg-emerald-800',
]

const bgClass = computed(() => {
  if (!props.name) return 'bg-gray-700'
  const idx = [...props.name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % bgPalette.length
  return bgPalette[idx]
})
</script>