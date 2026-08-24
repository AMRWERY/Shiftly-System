<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">financial-dashboards</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.financial_dashboards"),
  description: () => t("meta.financial_dashboards_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>