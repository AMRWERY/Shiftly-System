<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">contact-details</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.contact_details"),
  description: () => t("meta.contact_details_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>