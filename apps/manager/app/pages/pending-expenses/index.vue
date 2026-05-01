<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      pending-expenses
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.pending_expenses"),
  description: () => t("meta.pending_expenses_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>