<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/salary-components" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Salary Components',
            icon: 'material-symbols:account-balance-rounded',
            to: '/salary-components',
          },
          {
            label: 'Create Salary Components',
            icon: 'material-symbols:account-balance-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.salary_components")),
  description: () => t("meta.salary_components_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
