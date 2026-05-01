<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">salary-components</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.salary_components"),
  description: () => t("meta.salary_components_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>