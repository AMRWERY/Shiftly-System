<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">goals-setting-kpis</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.goals_setting_kpis"),
  description: () => t("meta.goals_setting_kpis_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>