<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/goods-receipt-in" />
      <LazyVBreadcrumb :items="[{ label: 'Goods Receipt In', icon: 'material-symbols:download-rounded', to: '/goods-receipt-in' }, { label: 'Create Goods Receipt', icon: 'material-symbols:download-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.goods_receipt_in")), description: () => t("meta.goods_receipt_in_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
