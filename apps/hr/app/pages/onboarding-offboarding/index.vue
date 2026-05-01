<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">onboarding-offboarding</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.onboarding_offboarding"),
  description: () => t("meta.onboarding_offboarding_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>