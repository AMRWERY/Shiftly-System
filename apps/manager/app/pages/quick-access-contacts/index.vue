<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      quick-access-contacts
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.quick_access_contacts"),
  description: () => t("meta.quick_access_contacts_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>