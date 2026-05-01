<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      status-summary
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.status_summary"),
  description: () => t("meta.status_summary_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>