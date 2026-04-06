<template>
  <div ref="container" class="v-dropdown">
    <div class="v-dropdown-trigger" @click="open = !open">
      <slot name="trigger" :open="open" />
    </div>
    <Transition name="dropdown">
      <div v-if="open" class="v-dropdown-menu" :class="`ui-dropdown-menu--${align}`">
        <slot :close="() => (open = false)" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

defineProps<{
  align?: 'left' | 'right'
}>()

const open = ref(false)
const container = ref<HTMLElement | null>(null)

onClickOutside(container, () => { open.value = false })
</script>
