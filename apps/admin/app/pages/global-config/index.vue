<template>
  <div>
    <h1>Global Config</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.global_config"),
  description: () => t("meta.global_config_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>