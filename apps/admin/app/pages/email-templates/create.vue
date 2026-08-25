<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/email-templates" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Email Templates',
            icon: 'material-symbols:mail-rounded',
            to: '/email-templates',
          },
          {
            label: 'Create Email Template',
            icon: 'material-symbols:mail-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.email_templates")),
  description: () => t("meta.email_templates_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>