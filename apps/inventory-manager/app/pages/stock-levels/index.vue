<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">stock-levels</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.stock_levels"),
  description: () => t("meta.stock_levels_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>