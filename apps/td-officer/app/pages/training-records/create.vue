<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/training-records" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Training Records',
            icon: 'material-symbols:school-rounded',
            to: '/training-records',
          },
          {
            label: 'Create Training Record',
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
  title: computed(() => t("meta.training_records")),
  description: () => t("meta.training_records_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
