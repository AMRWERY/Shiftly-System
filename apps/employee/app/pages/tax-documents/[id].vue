<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/tax-documents" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Tax Documents',
            icon: 'material-symbols:description-rounded',
            to: '/tax-documents',
          },
          {
            label: 'Tax Document Details',
            icon: 'material-symbols:description-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.tax_documents"),
  description: t("meta.tax_documents_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
