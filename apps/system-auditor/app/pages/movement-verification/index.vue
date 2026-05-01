<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      movement-verification
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.movement_verification"),
  description: () => t("meta.movement_verification_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>