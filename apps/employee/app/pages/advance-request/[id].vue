<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/advance-request" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Advance Request',
            icon: 'material-symbols:payments-rounded',
            to: '/advance-request',
          },
          {
            label: 'Advance Request Details',
            icon: 'material-symbols:payments-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.advance_request"),
  description: t("meta.advance_request_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
