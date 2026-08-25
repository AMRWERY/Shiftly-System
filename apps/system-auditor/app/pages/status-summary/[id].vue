<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/status-summary" />
      <LazyVBreadcrumb :items="[{ label: 'Status Summary', icon: 'material-symbols:shield-rounded', to: '/status-summary' }, { label: 'Status Entry Details', icon: 'material-symbols:shield-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.status_summary"), description: t("meta.status_summary_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
