<template>
  <div>
    <h1>Permission</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() =>
    user.value
      ? `${t("permissions.edit_permissions")} - ${user.value.fullName}`
      : t("permissions.edit_permissions"),
  ),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>