<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">personal-info</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.personal_info"),
  description: () => t("meta.personal_info_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>