<template>
  <div class="workflow-timeline">
    <div v-for="event in events" :key="event.id" class="workflow-timeline-event">
      <div class="workflow-timeline-event-dot" :class="`workflow-timeline-event-dot--${event.type}`" />
      <div class="workflow-timeline-event-body">
        <p class="workflow-timeline-event-actor">{{ event.actor }}</p>
        <p class="workflow-timeline-event-action">{{ event.action }}</p>
        <p class="workflow-timeline-event-time">{{ event.timestamp }}</p>
        <p v-if="event.note" class="workflow-timeline-event-note">{{ event.note }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  events?: {
    id: string
    actor: string
    action: string
    type: 'approved' | 'rejected' | 'submitted' | 'comment'
    timestamp: string
    note?: string
  }[]
}>()
</script>
