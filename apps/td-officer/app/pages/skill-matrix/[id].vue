<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/skill-matrix" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Skill Matrix',
            icon: 'material-symbols:grid-view-rounded',
            to: '/skill-matrix',
          },
          {
            label: 'Skill Matrix Details',
            icon: 'material-symbols:grid-view-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.skill_matrix"),
  description: t("meta.skill_matrix_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
