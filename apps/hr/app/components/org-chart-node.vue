<template>
  <div class="org-chart-node">
    <LazyVAvatar :name="node?.name" size="md" />

    <p class="org-chart-node-name">{{ node?.name }}</p>
    <p class="org-chart-node-title">{{ node?.title }}</p>
    <div v-if="node?.children?.length" class="org-chart-node-children">
      <OrgChartNode v-for="child in node.children" :key="child.id" :node="child" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrgNode } from '../types/charts'

defineProps<{
  node?: OrgNode
}>()
</script>