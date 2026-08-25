<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/shift-management" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Shift Management',
            icon: 'material-symbols:work-history-rounded',
            to: '/shift-management',
          },
          {
            label: 'Shift Details',
            icon: 'material-symbols:work-history-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.shift_management"),
  description: t("meta.shift_management_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
