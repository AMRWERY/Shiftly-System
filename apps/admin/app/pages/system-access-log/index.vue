<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      {{ t("layouts.system_access_log") }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.system_access_log"),
  description: () => t("meta.system_access_log_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>