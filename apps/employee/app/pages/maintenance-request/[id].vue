<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/maintenance-request" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Maintenance Request',
            icon: 'material-symbols:build-rounded',
            to: '/maintenance-request',
          },
          {
            label: 'Maintenance Request Details',
            icon: 'material-symbols:build-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.maintenance_request"),
  description: t("meta.maintenance_request_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
