<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/custom-report-builder" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Custom Report Builder',
            icon: 'material-symbols:analytics-rounded',
            to: '/custom-report-builder',
          },
          {
            label: 'Create Custom Report Builder',
            icon: 'material-symbols:analytics-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.custom_report_builder")),
  description: () => t("meta.custom_report_builder_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>