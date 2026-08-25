<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/payroll-reports" />
      <LazyVBreadcrumb :items="[{ label: 'Payroll Reports', icon: 'material-symbols:bar-chart-rounded', to: '/payroll-reports' }, { label: 'Payroll Report Details', icon: 'material-symbols:bar-chart-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.payroll_reports"), description: t("meta.payroll_reports_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
