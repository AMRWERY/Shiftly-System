<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/all-system-activity" />
      <LazyVBreadcrumb :items="[{ label: 'All System Activity', icon: 'material-symbols:manage-history-rounded', to: '/all-system-activity' }, { label: 'Activity Details', icon: 'material-symbols:manage-history-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.all_system_activity"), description: t("meta.all_system_activity_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
