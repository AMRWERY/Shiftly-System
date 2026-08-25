<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/leave-requests" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Leave Requests',
            icon: 'material-symbols:beach-access-rounded',
            to: '/leave-requests',
          },
          {
            label: 'Create Leave Request',
            icon: 'material-symbols:beach-access-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.leave_requests")),
  description: () => t("meta.leave_requests_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
