<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/enrollment-requests" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Enrollment Requests',
            icon: 'material-symbols:how-to-reg-rounded',
            to: '/enrollment-requests',
          },
          {
            label: 'Create Enrollment Request',
            icon: 'material-symbols:how-to-reg-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.enrollment_requests")),
  description: () => t("meta.enrollment_requests_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
