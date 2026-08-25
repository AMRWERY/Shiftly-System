<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/candidate-pipeline" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Candidate Pipeline',
            icon: 'material-symbols:person-search-rounded',
            to: '/candidate-pipeline',
          },
          {
            label: 'Create Candidate',
            icon: 'material-symbols:person-search-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.candidate_pipeline")),
  description: () => t("meta.candidate_pipeline_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
