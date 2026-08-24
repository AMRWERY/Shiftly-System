<template>
  <div>
    <div class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      <p>Nexux Employee Dashboard</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.dashboard"),
  description: () => t("meta.dashboard_description"),
});

definePageMeta({
  layout: "dashboard",
});
</script>