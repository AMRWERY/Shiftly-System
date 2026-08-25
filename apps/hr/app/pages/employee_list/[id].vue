<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/employee_list" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Employee List',
            icon: 'material-symbols:badge-rounded',
            to: '/employee_list',
          },
          {
            label: 'Employee Details',
            icon: 'material-symbols:badge-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.employee_list"),
  description: t("meta.employee_list_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
