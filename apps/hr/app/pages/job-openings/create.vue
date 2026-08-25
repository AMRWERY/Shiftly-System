<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/job-openings" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Job Openings',
            icon: 'material-symbols:business-center-rounded',
            to: '/job-openings',
          },
          {
            label: 'Create Job Opening',
            icon: 'material-symbols:business-center-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.job_openings")),
  description: () => t("meta.job_openings_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
