<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">goods-receipt-in</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.goods_receipt_in"),
  description: () => t("meta.goods_receipt_in_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>