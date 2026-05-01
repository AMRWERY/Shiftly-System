<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      scheduled-tasks
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.scheduled_tasks"),
  description: () => t("meta.scheduled_tasks_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>