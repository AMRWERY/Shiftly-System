<template>
  <div>
    <h1 class="p-10 text-3xl font-semibold text-tx-primary">Policies Review Details</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.policies_review"),
  description: t("meta.policies_review_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>