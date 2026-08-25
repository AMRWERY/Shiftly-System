<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/qualifications" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Qualifications',
            icon: 'material-symbols:school-rounded',
            to: '/qualifications',
          },
          {
            label: 'Create Qualification',
            icon: 'material-symbols:school-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.qualifications")),
  description: () => t("meta.qualifications_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
