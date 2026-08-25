<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/overtime-penalties" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Overtime Penalties',
            icon: 'material-symbols:timer-rounded',
            to: '/overtime-penalties',
          },
          {
            label: 'Create Overtime/Penalty',
            icon: 'material-symbols:timer-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.overtime_penalties")),
  description: () => t("meta.overtime_penalties_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
