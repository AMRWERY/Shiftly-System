<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/training-analysis" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Required Training Analysis',
            icon: 'material-symbols:analytics-rounded',
            to: '/training-analysis',
          },
          {
            label: 'Create Training Analysis',
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
  title: computed(() => t("meta.training_analysis")),
  description: () => t("meta.training_analysis_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
