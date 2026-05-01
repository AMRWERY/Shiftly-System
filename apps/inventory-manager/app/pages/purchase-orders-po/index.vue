<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">purchase-orders-po</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.purchase_orders_po"),
  description: () => t("meta.purchase_orders_po_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>