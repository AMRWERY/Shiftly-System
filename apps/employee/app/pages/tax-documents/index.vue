<template>
  <div class="p-10 space-y-6">

    <!-- Short breadcrumb (no collapse) -->
    <LazyVBreadcrumb :items="shortCrumbs" />

    <!-- Long breadcrumb (auto-collapses middle items) -->
    <LazyVBreadcrumb :items="longCrumbs" />

  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/layers/base/components/shared/LazyVBreadcrumb.vue'

definePageMeta({ layout: 'dashboard' })

const shortCrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Documents', href: '/documents' },
  { label: 'Tax Documents' },
]

const longCrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '' },
  { label: 'HR', href: '' },
  { label: 'Department', href: '' },
  { label: 'Team', href: '' },
  { label: 'Project', href: '' },
  { label: 'Task Details' },
]
</script>