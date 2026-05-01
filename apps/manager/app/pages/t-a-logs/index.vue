<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">t-a-logs</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.t_a_logs"),
  description: () => t("meta.t_a_logs_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>