<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/company-structure" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Company Structure',
            icon: 'material-symbols:account-tree-rounded',
            to: '/company-structure',
          },
          {
            label: 'Create Company Structure',
            icon: 'material-symbols:account-tree-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.company_structure")),
  description: () => t("meta.company_structure_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>