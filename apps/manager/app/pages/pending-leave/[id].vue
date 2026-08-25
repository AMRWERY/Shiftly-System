<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/pending-leave" />
      <LazyVBreadcrumb :items="[{ label: 'Pending Leave', icon: 'material-symbols:beach-access-rounded', to: '/pending-leave' }, { label: 'Leave Request Details', icon: 'material-symbols:beach-access-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.pending_leave"), description: t("meta.pending_leave_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
