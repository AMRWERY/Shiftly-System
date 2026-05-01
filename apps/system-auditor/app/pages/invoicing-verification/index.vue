<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      invoicing-verification
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.invoicing_verification"),
  description: () => t("meta.invoicing_verification_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>