<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">advance-request</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.advance_request"),
  description: () => t("meta.advance_request_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>