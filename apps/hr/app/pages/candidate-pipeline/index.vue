<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">candidate-pipeline</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.candidate_pipeline"),
  description: () => t("meta.candidate_pipeline_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>