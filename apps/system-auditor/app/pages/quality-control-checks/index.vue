<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      quality-control-checks
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.quality_control_checks"),
  description: () => t("meta.quality_control_checks_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>