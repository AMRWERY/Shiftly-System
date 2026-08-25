<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/physical-count-records" />
      <LazyVBreadcrumb :items="[{ label: 'Physical Count Records', icon: 'material-symbols:fact-check-rounded', to: '/physical-count-records' }, { label: 'Create Count Record', icon: 'material-symbols:fact-check-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.physical_count_records")), description: () => t("meta.physical_count_records_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
