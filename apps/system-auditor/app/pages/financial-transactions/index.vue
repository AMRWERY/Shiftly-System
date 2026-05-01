<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      financial-transactions
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.financial_transactions"),
  description: () => t("meta.financial_transactions_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>