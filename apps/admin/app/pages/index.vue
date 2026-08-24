<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.dashboard"),
  description: () => t("meta.dashboard_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>