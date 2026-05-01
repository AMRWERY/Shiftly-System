<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">interview-scheduling</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.interview_scheduling"),
  description: () => t("meta.interview_scheduling_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>