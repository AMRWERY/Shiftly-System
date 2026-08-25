<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/daily-logs" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Daily Logs',
            icon: 'material-symbols:schedule-rounded',
            to: '/daily-logs',
          },
          {
            label: 'Daily Log Details',
            icon: 'material-symbols:schedule-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.daily_logs"),
  description: t("meta.daily_logs_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
