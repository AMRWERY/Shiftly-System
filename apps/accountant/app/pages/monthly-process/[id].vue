<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/monthly-process" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Monthly Process',
            icon: 'material-symbols:calendar-clock-rounded',
            to: '/monthly-process',
          },
          {
            label: 'Monthly Process Details',
            icon: 'material-symbols:calendar-clock-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.monthly_process"),
  description: t("meta.monthly_process_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
