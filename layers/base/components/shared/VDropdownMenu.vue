<template>
  <div ref="container" class="relative inline-block text-start">
    <div class="v-dropdown-trigger" @click="toggle">
      <slot name="trigger" :open="open">
        <!-- Match VDownloadFilesMenu trigger: outline, padding, chevron spacing -->
        <LazyVButton v-if="label" type="button" variant="outline" border-color="border-gray-700" text-color="text-white"
          hover-color="hover:bg-white/10" padding-x="px-5" padding-y="py-2.5" class="font-semibold !justify-start">
          {{ label }}
          <Icon :name="icon || 'ic:sharp-keyboard-arrow-down'"
            class="h-5 w-5 shrink-0 ms-3 text-gray-400 transition-transform duration-200 ease-out"
            :class="[iconClass, { 'rotate-180': open }]" />
        </LazyVButton>
      </slot>
    </div>

    <Transition name="dropdown-fade">
      <div v-if="open"
        class="absolute z-[1000] mt-2 block w-max min-w-full rounded-lg border border-gray-700 bg-brand-cardBg py-2 px-2 shadow-2xl"
        :class="[align === 'right' ? 'end-0' : 'start-0', menuClass]">
        <div class="scroll-container max-h-96 overflow-y-auto">
          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  label?: string
  icon?: string
  iconClass?: string
  align?: 'left' | 'right'
  menuClass?: string
}>()

const open = ref(false)
const container = ref<HTMLElement | null>(null)

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

onClickOutside(container, close)
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.scroll-container::-webkit-scrollbar {
  width: 4px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>