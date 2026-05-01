<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      parts-usage
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.parts_usage"),
  description: () => t("meta.parts_usage_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>