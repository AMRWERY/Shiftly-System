<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/attendance-history" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Attendance History',
            icon: 'material-symbols:history-rounded',
            to: '/attendance-history',
          },
          {
            label: 'Create Attendance History',
            icon: 'material-symbols:history-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.attendance_history")),
  description: () => t("meta.attendance_history_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
