<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">employee-assets-list</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.employee_assets_list"),
  description: () => t("meta.employee_assets_list_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>