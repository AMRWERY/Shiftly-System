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
            label: 'Create Skill Matrix Entry',
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
  title: computed(() => t("meta.skill_matrix")),
  description: () => t("meta.skill_matrix_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
