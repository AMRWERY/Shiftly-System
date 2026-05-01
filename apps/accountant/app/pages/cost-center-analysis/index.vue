<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-gray-100">cost-center-analysis</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.cost_center_analysis"),
  description: () => t("meta.cost_center_analysis_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
