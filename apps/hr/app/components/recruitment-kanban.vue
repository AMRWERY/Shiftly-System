<template>
  <div class="recruitment-kanban">
    <div v-for="stage in stages" :key="stage.key" class="recruitment-kanban-column">
      <h3 class="recruitment-kanban-column-title">{{ stage.label }}</h3>
      <div class="recruitment-kanban-cards">
        <slot :name="stage.key" :candidates="getCandidates(stage.key)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  candidates?: { id: string; name: string; stage: string }[]
}>()

const stages = [
  { key: 'applied', label: 'Applied' },
  { key: 'screening', label: 'Screening' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'hired', label: 'Hired' },
]

function getCandidates(stage: string) {
  return (props.candidates ?? []).filter((c) => c.stage === stage)
}
</script>
