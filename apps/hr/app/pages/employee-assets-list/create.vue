<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/employee-assets-list" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Employee Assets List',
            icon: 'material-symbols:devices-rounded',
            to: '/employee-assets-list',
          },
          {
            label: 'Create Employee Asset',
            icon: 'material-symbols:devices-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.employee_assets_list")),
  description: () => t("meta.employee_assets_list_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
