<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">expense-claim</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.expense_claim"),
  description: () => t("meta.expense_claim_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>