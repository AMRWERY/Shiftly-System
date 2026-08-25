<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/360-feedback" />

      <LazyVBreadcrumb
        :items="[
          {
            label: '360° Feedback',
            icon: 'material-symbols:rate-review-rounded',
            to: '/360-feedback',
          },
          {
            label: '360° Feedback Details',
            icon: 'material-symbols:rate-review-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.360_feedback"),
  description: t("meta.360_feedback_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
