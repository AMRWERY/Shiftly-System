<template>
  <div>
    <h1>Tax Documents</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.tax_documents"),
  description: () => t("meta.tax_documents_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>