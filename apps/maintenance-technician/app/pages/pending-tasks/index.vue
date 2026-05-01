<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      pending-tasks
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.pending_tasks"),
  description: () => t("meta.pending_tasks_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>