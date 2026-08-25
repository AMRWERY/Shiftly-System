<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/stock-value" />
      <LazyVBreadcrumb :items="[{ label: 'Stock Value', icon: 'material-symbols:bar-chart-rounded', to: '/stock-value' }, { label: 'Stock Value Details', icon: 'material-symbols:bar-chart-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.stock_value"), description: t("meta.stock_value_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
