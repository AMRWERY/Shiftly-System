<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">handover-return-process</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.handover_return_process"),
  description: () => t("meta.handover_return_process_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>