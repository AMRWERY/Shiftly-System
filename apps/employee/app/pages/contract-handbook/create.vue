<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/contract-handbook" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Contract & Handbook',
            icon: 'material-symbols:menu-book-rounded',
            to: '/contract-handbook',
          },
          {
            label: 'Create Contract & Handbook',
            icon: 'material-symbols:menu-book-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.contract_handbook")),
  description: () => t("meta.contract_handbook_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
