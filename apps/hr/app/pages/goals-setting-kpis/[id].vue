<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/goals-setting-kpis" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Goals Setting & KPIs',
            icon: 'material-symbols:flag-rounded',
            to: '/goals-setting-kpis',
          },
          {
            label: 'Goal / KPI Details',
            icon: 'material-symbols:flag-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.goals_setting_kpis"),
  description: t("meta.goals_setting_kpis_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
