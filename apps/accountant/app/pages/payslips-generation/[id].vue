<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/payslips-generation" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Payslips Generation',
            icon: 'material-symbols:receipt-rounded',
            to: '/payslips-generation',
          },
          {
            label: 'Payslips Generation Details',
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
  title: t("meta.payslips_generation"),
  description: t("meta.payslips_generation_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
