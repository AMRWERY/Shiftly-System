<template>
  <div>
    <h1>company-structure</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.company_structure"),
  description: () => t("meta.company_structure_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>