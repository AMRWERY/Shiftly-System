<template>
  <div>
    <h1>Users</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.users"),
  description: () => t("meta.users_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>