<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">critical-alerts</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.critical_alerts"),
  description: () => t("meta.critical_alerts_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>