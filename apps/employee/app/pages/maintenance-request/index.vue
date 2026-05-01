<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">maintenance-request</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.maintenance_request"),
  description: () => t("meta.maintenance_request_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>