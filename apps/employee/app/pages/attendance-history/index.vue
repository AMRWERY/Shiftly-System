<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">attendance-history</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.attendance_history"),
  description: () => t("meta.attendance_history_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>