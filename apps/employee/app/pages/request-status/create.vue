<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/request-status" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Request Status',
            icon: 'material-symbols:pending-actions-rounded',
            to: '/request-status',
          },
          {
            label: 'Create Request Status',
            icon: 'material-symbols:pending-actions-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.request_status")),
  description: () => t("meta.request_status_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
