<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-gray-100">accounts-receivable-payable</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.accounts_receivable_payable"),
  description: () => t("meta.accounts_receivable_payable_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
