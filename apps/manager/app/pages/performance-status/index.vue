<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      performance-status
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.performance_status"),
  description: () => t("meta.performance_status_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>