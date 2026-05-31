<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">email-templates</p>

    <LazyVEmptyState title="No email templates found" description="Create your first email template to get started"
      icon="heroicons:envelope" color="gray" accentBorder />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.email_templates"),
  description: () => t("meta.email_templates_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>