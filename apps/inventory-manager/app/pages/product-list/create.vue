<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/product-list" />
      <LazyVBreadcrumb :items="[{ label: 'Product List', icon: 'material-symbols:category-rounded', to: '/product-list' }, { label: 'Create Product', icon: 'material-symbols:category-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.product_list")), description: () => t("meta.product_list_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
