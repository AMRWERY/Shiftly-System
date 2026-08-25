<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/team-overview" />
      <LazyVBreadcrumb :items="[{ label: 'Team Overview', icon: 'material-symbols:groups-rounded', to: '/team-overview' }, { label: 'Create Team Member', icon: 'material-symbols:groups-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.team_overview")), description: () => t("meta.team_overview_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
