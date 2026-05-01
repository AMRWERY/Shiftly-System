<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">job-openings</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.job_openings"),
  description: () => t("meta.job_openings_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>