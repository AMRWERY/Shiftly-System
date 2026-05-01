<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      priority-queue
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.priority_queue"),
  description: () => t("meta.priority_queue_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>