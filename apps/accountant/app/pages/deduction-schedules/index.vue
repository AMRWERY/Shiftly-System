<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">deduction-schedules</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.deduction_schedules"),
  description: () => t("meta.deduction_schedules_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>