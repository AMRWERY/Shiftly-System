<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/assigned-list" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Assigned Assets List',
            icon: 'material-symbols:devices-rounded',
            to: '/assigned-list',
          },
          {
            label: 'Assigned Asset Details',
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
  title: t("meta.assigned_list"),
  description: t("meta.assigned_list_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
