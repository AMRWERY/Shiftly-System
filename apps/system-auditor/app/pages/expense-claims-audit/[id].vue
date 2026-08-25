<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/expense-claims-audit" />
      <LazyVBreadcrumb :items="[{ label: 'Expense Claims Audit', icon: 'material-symbols:receipt-long-rounded', to: '/expense-claims-audit' }, { label: 'Audit Record Details', icon: 'material-symbols:receipt-long-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.expense_claims_audit"), description: t("meta.expense_claims_audit_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
