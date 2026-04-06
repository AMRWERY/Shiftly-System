<template>
  <div class="asset-timeline">
    <div v-for="event in events" :key="event.id" class="asset-timeline-event">
      <div class="asset-timeline-event-dot" />
      <div class="asset-timeline-event-content">
        <p class="asset-timeline-event-title">{{ event.title }}</p>
        <p class="asset-timeline-event-date">{{ event.date }}</p>
        <p v-if="event.notes" class="asset-timeline-event-notes">{{ event.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  events?: { id: string; title: string; date: string; notes?: string }[]
}>()
</script>
