<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      course-creation
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.course_creation"),
  description: () => t("meta.course_creation_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>