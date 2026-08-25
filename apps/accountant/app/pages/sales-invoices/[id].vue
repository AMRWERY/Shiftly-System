<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/sales-invoices" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Sales Invoices',
            icon: 'material-symbols:point-of-sale-rounded',
            to: '/sales-invoices',
          },
          {
            label: 'Sales Invoices Details',
            icon: 'material-symbols:point-of-sale-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.sales_invoices"),
  description: t("meta.sales_invoices_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
