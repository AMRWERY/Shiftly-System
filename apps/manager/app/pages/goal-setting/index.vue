<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      goal-setting
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.goal_setting"),
  description: () => t("meta.goal_setting_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>