<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/scheduling" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Scheduling',
            icon: 'material-symbols:event-rounded',
            to: '/scheduling',
          },
          {
            label: 'Schedule Details',
            icon: 'material-symbols:event-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.scheduling"),
  description: t("meta.scheduling_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
