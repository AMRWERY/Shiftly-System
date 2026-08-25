<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/course-creation" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Course Creation',
            icon: 'material-symbols:add-circle-outline-rounded',
            to: '/course-creation',
          },
          {
            label: 'Create Course',
            icon: 'material-symbols:add-circle-outline-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.course_creation")),
  description: () => t("meta.course_creation_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
