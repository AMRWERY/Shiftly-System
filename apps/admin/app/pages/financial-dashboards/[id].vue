<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/financial-dashboards" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Financial Dashboards',
            icon: 'material-symbols:query-stats-rounded',
            to: '/financial-dashboards',
          },
          {
            label: 'Financial Dashboard Details',
            icon: 'material-symbols:query-stats-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.financial_dashboards"),
  description: t("meta.financial_dashboards_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>