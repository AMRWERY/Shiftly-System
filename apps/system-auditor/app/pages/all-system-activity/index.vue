<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      all-system-activity
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.all_system_activity"),
  description: () => t("meta.all_system_activity_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>