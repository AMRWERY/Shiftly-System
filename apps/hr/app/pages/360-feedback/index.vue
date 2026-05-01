<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">360-feedback</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.feedback_360"),
  description: () => t("meta.feedback_360_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
