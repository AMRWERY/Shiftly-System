<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/reorder-settings" />
      <LazyVBreadcrumb :items="[{ label: 'Reorder Settings', icon: 'material-symbols:autorenew-rounded', to: '/reorder-settings' }, { label: 'Reorder Setting Details', icon: 'material-symbols:autorenew-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.reorder_settings"), description: t("meta.reorder_settings_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
