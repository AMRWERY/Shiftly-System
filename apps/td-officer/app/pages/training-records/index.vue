<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      training-records
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.training_records"),
  description: () => t("meta.training_records_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>