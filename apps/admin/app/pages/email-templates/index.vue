<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-gray-100">email-templates</p>

    <div class="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <LazyVEmptyState title="No email templates found" description="Create your first email template to get started"
        icon="heroicons:envelope" color="gray" accentBorder />

      <LazyVEmptyState title="No email templates found" description="Create your first email template to get started"
        icon="heroicons:envelope" color="gray" accentBorder />

      <LazyVEmptyState title="No email templates found" description="Create your first email template to get started"
        icon="heroicons:envelope" color="gray" accentBorder />

      <LazyVEmptyState title="No email templates found" description="Create your first email template to get started"
        icon="heroicons:envelope" color="gray" accentBorder />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>