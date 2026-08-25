<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/global-config" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Global Config',
            icon: 'material-symbols:settings-rounded',
            to: '/global-config',
          },
          {
            label: 'Global Config Details',
            icon: 'material-symbols:settings-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.global_config"),
  description: t("meta.global_config_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>