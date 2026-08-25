<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/stock-levels" />
      <LazyVBreadcrumb :items="[{ label: 'Stock Levels', icon: 'material-symbols:inventory-rounded', to: '/stock-levels' }, { label: 'Stock Level Details', icon: 'material-symbols:inventory-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.stock_levels"), description: t("meta.stock_levels_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
