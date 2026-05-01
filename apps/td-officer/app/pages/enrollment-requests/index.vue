<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      enrollment-requests
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.enrollment_requests"),
  description: () => t("meta.enrollment_requests_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>