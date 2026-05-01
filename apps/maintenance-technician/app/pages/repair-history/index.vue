<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      repair-history
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.repair_history"),
  description: () => t("meta.repair_history_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>