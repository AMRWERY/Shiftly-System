<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/evaluation-cycles" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Evaluation Cycles',
            icon: 'material-symbols:star-rounded',
            to: '/evaluation-cycles',
          },
          {
            label: 'Create Evaluation Cycle',
            icon: 'material-symbols:star-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.evaluation_cycles")),
  description: () => t("meta.evaluation_cycles_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
