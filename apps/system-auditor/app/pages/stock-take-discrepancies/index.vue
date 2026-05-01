<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      stock-take-discrepancies
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.stock_take_discrepancies"),
  description: () => t("meta.stock_take_discrepancies_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>