<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">quality-control-logs</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.quality_control_logs"),
  description: () => t("meta.quality_control_logs_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>