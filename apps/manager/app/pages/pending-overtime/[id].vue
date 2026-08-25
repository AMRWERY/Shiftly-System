<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/pending-overtime" />
      <LazyVBreadcrumb :items="[{ label: 'Pending Overtime', icon: 'material-symbols:timer-rounded', to: '/pending-overtime' }, { label: 'Overtime Request Details', icon: 'material-symbols:timer-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.pending_overtime"), description: t("meta.pending_overtime_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
