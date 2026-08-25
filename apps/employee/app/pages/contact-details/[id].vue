<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/contact-details" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Contact Details',
            icon: 'material-symbols:contact-phone-rounded',
            to: '/contact-details',
          },
          {
            label: 'Contact Details Details',
            icon: 'material-symbols:contact-phone-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.contact_details"),
  description: t("meta.contact_details_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
