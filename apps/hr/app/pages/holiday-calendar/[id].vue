<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/holiday-calendar" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Holiday Calendar',
            icon: 'material-symbols:calendar-month-rounded',
            to: '/holiday-calendar',
          },
          {
            label: 'Holiday Details',
            icon: 'material-symbols:calendar-month-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.holiday_calendar"),
  description: t("meta.holiday_calendar_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
