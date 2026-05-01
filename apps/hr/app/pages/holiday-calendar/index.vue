<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">holiday-calendar</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.holiday_calendar"),
  description: () => t("meta.holiday_calendar_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>