<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/batch-expiry-tracking" />
      <LazyVBreadcrumb :items="[{ label: 'Batch & Expiry Tracking', icon: 'material-symbols:layers-rounded', to: '/batch-expiry-tracking' }, { label: 'Batch/Expiry Details', icon: 'material-symbols:layers-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.batch_expiry_tracking"), description: t("meta.batch_expiry_tracking_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
