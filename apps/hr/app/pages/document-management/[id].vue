<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/document-management" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Document Management',
            icon: 'material-symbols:folder-rounded',
            to: '/document-management',
          },
          {
            label: 'Document Details',
            icon: 'material-symbols:folder-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.document_management"),
  description: t("meta.document_management_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
