<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      inventory-adjustments
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.inventory_adjustments"),
  description: () => t("meta.inventory_adjustments_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>