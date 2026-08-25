<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/stock-adjustment" />
      <LazyVBreadcrumb :items="[{ label: 'Stock Adjustment', icon: 'material-symbols:tune-rounded', to: '/stock-adjustment' }, { label: 'Create Adjustment', icon: 'material-symbols:tune-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.stock_adjustment")), description: () => t("meta.stock_adjustment_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
