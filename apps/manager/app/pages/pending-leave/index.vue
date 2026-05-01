<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      pending-leave
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.pending_leave"),
  description: () => t("meta.pending_leave_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>