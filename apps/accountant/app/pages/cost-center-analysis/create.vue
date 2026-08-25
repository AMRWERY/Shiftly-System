<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/cost-center-analysis" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Cost Center Analysis',
            icon: 'material-symbols:analytics-rounded',
            to: '/cost-center-analysis',
          },
          {
            label: 'Create Cost Center Analysis',
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
  title: computed(() => t("meta.cost_center_analysis")),
  description: () => t("meta.cost_center_analysis_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
