<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">sales-invoices</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.sales_invoices"),
  description: () => t("meta.sales_invoices_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
