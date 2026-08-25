<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/payslips" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Payslips',
            icon: 'material-symbols:receipt-rounded',
            to: '/payslips',
          },
          {
            label: 'Payslip Details',
            icon: 'material-symbols:receipt-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.payslips"),
  description: t("meta.payslips_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
