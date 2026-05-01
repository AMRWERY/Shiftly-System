<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">audit-log</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.audit_log"),
  description: () => t("meta.audit_log_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
