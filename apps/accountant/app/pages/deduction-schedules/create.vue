<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/deduction-schedules" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Deduction Schedules',
            icon: 'material-symbols:do-not-disturb-on-rounded',
            to: '/deduction-schedules',
          },
          {
            label: 'Create Deduction Schedules',
            icon: 'material-symbols:do-not-disturb-on-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.deduction_schedules")),
  description: () => t("meta.deduction_schedules_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
