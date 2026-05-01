<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      leave-tracking
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.leave_tracking"),
  description: () => t("meta.leave_tracking_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>