<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">physical-count-records</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.physical_count_records"),
  description: () => t("meta.physical_count_records_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>