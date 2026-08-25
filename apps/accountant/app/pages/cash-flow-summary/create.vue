<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/cash-flow-summary" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Cash Flow Summary',
            icon: 'material-symbols:trending-up-rounded',
            to: '/cash-flow-summary',
          },
          {
            label: 'Create Cash Flow Summary',
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
  title: computed(() => t("meta.cash_flow_summary")),
  description: () => t("meta.cash_flow_summary_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
