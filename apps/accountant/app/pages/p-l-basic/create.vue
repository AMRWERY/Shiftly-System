<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/p-l-basic" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'P&L Basic',
            icon: 'material-symbols:bar-chart-rounded',
            to: '/p-l-basic',
          },
          {
            label: 'Create P&L Basic',
            icon: 'material-symbols:bar-chart-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.p_l_basic")),
  description: () => t("meta.p_l_basic_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
