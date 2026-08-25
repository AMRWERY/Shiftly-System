<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/financial-transactions" />
      <LazyVBreadcrumb :items="[{ label: 'Financial Transactions', icon: 'material-symbols:payments-rounded', to: '/financial-transactions' }, { label: 'Transaction Details', icon: 'material-symbols:payments-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.financial_transactions"), description: t("meta.financial_transactions_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
