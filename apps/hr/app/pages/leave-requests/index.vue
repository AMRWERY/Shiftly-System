<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">leave-requests</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.leave_requests"),
  description: () => t("meta.leave_requests_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>