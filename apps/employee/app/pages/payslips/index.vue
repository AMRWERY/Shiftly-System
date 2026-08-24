<template>
  <div>
    <h1>Payslips</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.payslips"),
  description: () => t("meta.payslips_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>