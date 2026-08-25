<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/categories-units" />
      <LazyVBreadcrumb :items="[{ label: 'Categories & Units', icon: 'material-symbols:label-rounded', to: '/categories-units' }, { label: 'Create Category/Unit', icon: 'material-symbols:label-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.categories_units")), description: () => t("meta.categories_units_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
