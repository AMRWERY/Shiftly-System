<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">custom-report-builder</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.custom_report_builder"),
  description: () => t("meta.custom_report_builder_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
