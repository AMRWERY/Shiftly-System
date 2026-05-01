<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      completed-history
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.completed_history"),
  description: () => t("meta.completed_history_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>