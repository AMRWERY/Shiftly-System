<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/resource-mgt" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Resource Management',
            icon: 'material-symbols:folder-open-rounded',
            to: '/resource-mgt',
          },
          {
            label: 'Resource Details',
            icon: 'material-symbols:folder-open-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.resource_mgt"),
  description: t("meta.resource_mgt_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
