<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/critical-alerts" />
      <LazyVBreadcrumb :items="[{ label: 'Critical Alerts', icon: 'material-symbols:notification-important-rounded', to: '/critical-alerts' }, { label: 'Create Critical Alert', icon: 'material-symbols:notification-important-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.critical_alerts")), description: () => t("meta.critical_alerts_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
