<template>
  <div>
    <h1>Leave Request</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.leave_request"),
  description: () => t("meta.leave_request_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>