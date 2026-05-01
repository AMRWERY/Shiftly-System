<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">reorder-settings</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.reorder_settings"),
  description: () => t("meta.reorder_settings_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>