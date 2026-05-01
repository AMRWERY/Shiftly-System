<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      stock-request-from-inventory
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.stock_request_from_inventory"),
  description: () => t("meta.stock_request_from_inventory_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>