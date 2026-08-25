<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/pending-expenses" />
      <LazyVBreadcrumb :items="[{ label: 'Pending Expenses', icon: 'material-symbols:receipt-long-rounded', to: '/pending-expenses' }, { label: 'Expense Details', icon: 'material-symbols:receipt-long-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.pending_expenses"), description: t("meta.pending_expenses_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
