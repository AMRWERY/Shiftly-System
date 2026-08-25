<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/career-path-mapping" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Career Path Mapping',
            icon: 'material-symbols:trending-up-rounded',
            to: '/career-path-mapping',
          },
          {
            label: 'Career Path Details',
            icon: 'material-symbols:trending-up-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.career_path_mapping"),
  description: t("meta.career_path_mapping_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
