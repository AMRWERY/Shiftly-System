<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      payroll-reports
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.payroll_reports"),
  description: () => t("meta.payroll_reports_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>