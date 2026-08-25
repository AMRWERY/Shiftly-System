<template>
  <div>
    <h1 class="p-10 text-3xl font-semibold text-tx-primary">User Details</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.user_details"),
  description: t("meta.user_details_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>