<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      policy-violations
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.policy_violations"),
  description: () => t("meta.policy_violations_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>