<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      resource-mgt
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.resource_mgt"),
  description: () => t("meta.resource_mgt_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>