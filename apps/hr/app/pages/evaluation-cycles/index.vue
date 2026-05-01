<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">evaluation-cycles</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.evaluation_cycles"),
  description: () => t("meta.evaluation_cycles_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>