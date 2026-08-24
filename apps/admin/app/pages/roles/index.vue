<template>
  <div>
    <p class="p-10 text-3xl font-semibold text-tx-primary">
      {{ t("layouts.roles") }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.roles"),
  description: () => t("meta.roles_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>