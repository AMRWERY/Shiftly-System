<template>
  <div>
    <div>
      <div class="mt-3 mb-6">
        <LazyVBreadcrumb :items="[{ label: 'Reorder Settings', icon: 'material-symbols:autorenew-rounded' }]" />
      </div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-100">Reorder Settings</h1>
        <div class="flex space-s-4">
          <LazyVDownloadFilesMenu :all-items="[]" :columns="[]" />
          <LazyVRefreshButton />
          <LazyVButton color="primary" size="sm" to="/reorder-settings/create" :padding-x="'px-3'" :padding-y="'py-2.5'" :rounded="'rounded-lg'" :block="true">Add New</LazyVButton>
        </div>
      </div>
      <LazyVTable :columns="[]" :items="[]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: () => t("meta.reorder_settings"), description: () => t("meta.reorder_settings_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>