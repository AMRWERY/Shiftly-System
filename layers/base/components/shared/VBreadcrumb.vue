<template>
  <nav aria-label="breadcrumb">
    <ol class="flex flex-wrap items-center gap-1 text-sm">
      <template v-for="(item, index) in visibleItems" :key="index">

        <!-- Separator (skip before first real item) -->
        <li v-if="index > 0" class="flex items-center text-gray-600" aria-hidden="true">
          <Icon name="heroicons:chevron-right" class="h-3.5 w-3.5" />
        </li>

        <!-- Collapsed ellipsis -->
        <li v-if="item.ellipsis" class="text-gray-600 px-0.5 select-none">
          …
        </li>

        <!-- Current (last) item -->
        <li v-else-if="index === visibleItems.length - 1" aria-current="page">
          <span class="font-bold text-white">{{ item.label }}</span>
        </li>

        <!-- Link item -->
        <li v-else>
          <NuxtLink v-if="item.href" :to="item.href"
            class="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-gray-200">
            <Icon v-if="index === 0" name="heroicons:home" class="h-3.5 w-3.5 flex-shrink-0" />
            <span>{{ item.label }}</span>
          </NuxtLink>
          <span v-else class="flex items-center gap-1.5 text-gray-500">
            <Icon v-if="index === 0" name="heroicons:home" class="h-3.5 w-3.5 flex-shrink-0" />
            <span>{{ item.label }}</span>
          </span>
        </li>

      </template>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
export interface BreadcrumbItem {
  label: string
  href?: string
}

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    maxVisible?: number
  }>(),
  { maxVisible: 4 }
)

const visibleItems = computed(() => {
  const { items, maxVisible } = props
  if (items.length <= maxVisible) return items

  // Keep first item, inject ellipsis, then last (maxVisible - 2) items
  const tail = items.slice(-(maxVisible - 2))
  return [items[0], { label: '...', ellipsis: true } as any, ...tail]
})
</script>