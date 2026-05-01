<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">payslips-generation</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.payslips_generation"),
  description: () => t("meta.payslips_generation_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
