<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/personal-info" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Personal Info',
            icon: 'material-symbols:person-rounded',
            to: '/personal-info',
          },
          {
            label: 'Create Personal Info',
            icon: 'material-symbols:person-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.personal_info")),
  description: () => t("meta.personal_info_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
