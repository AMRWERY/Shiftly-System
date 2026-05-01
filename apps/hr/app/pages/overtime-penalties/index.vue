<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">overtime-penalties</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.overtime_penalties"),
  description: () => t("meta.overtime_penalties_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>