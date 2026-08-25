<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/inventory-adjustments" />
      <LazyVBreadcrumb :items="[{ label: 'Inventory Adjustments', icon: 'material-symbols:tune-rounded', to: '/inventory-adjustments' }, { label: 'Adjustment Details', icon: 'material-symbols:tune-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.inventory_adjustments"), description: t("meta.inventory_adjustments_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
