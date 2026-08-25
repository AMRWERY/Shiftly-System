<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/permissions" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Permissions',
            icon: 'material-symbols:policy-rounded',
            to: '/permissions',
          },
          {
            label: 'Create Permissions',
            icon: 'material-symbols:policy-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.permissions")),
  description: () => t("meta.permissions_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>