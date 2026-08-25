<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/activity-monitoring" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Activity Monitoring',
            icon: 'material-symbols:monitoring-rounded',
            to: '/activity-monitoring',
          },
          {
            label: 'Create Activity Monitoring',
            icon: 'material-symbols:monitoring-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.activity_monitoring")),
  description: () => t("meta.activity_monitoring_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>