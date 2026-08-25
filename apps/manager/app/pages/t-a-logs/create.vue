<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/t-a-logs" />
      <LazyVBreadcrumb :items="[{ label: 'T&A Logs', icon: 'material-symbols:schedule-rounded', to: '/t-a-logs' }, { label: 'Create T&A Log', icon: 'material-symbols:schedule-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.t_a_logs")), description: () => t("meta.t_a_logs_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
