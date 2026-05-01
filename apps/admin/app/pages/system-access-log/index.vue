<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">system-access-log</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
      <LazyVKpiCardSkeleton />

      <LazyVKpiCard label="Total Users" value="100" :trend="10" icon="heroicons:user-group" />
    </div>

    <LazyLazyVDropdownMenun label="Actions">
      <template #default="{ close }">
        <div class="min-w-[200px]">
          <button type="button"
            class="w-full cursor-pointer rounded-md px-4 py-2.5 text-start text-sm font-medium text-tx-secondary transition-colors hover:bg-[var(--bg-hover)]"
            @click="close">
            Download Log
          </button>
          <button type="button"
            class="w-full cursor-pointer rounded-md px-4 py-2.5 text-start text-sm font-medium text-rose-400 transition-colors hover:bg-[var(--bg-hover)]"
            @click="close">
            Clear Access Log
          </button>
        </div>
      </template>
    </LazyLazyVDropdownMenun>

    <LazyVDownloadFilesMenu :allItems="[]" :columns="[]" />

    <div class="space-y-4">
      <LazyVAvatar />

      <LazyVBackButton />

      <LazyVBadge label="Active" color="success" />

      <LazyVBreadcrumb
        :items="[{ label: 'Home', to: '/' }, { label: 'System Access Log', to: '/system-access-log' }]" />

      <LazyVDatePicker />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.system_access_log"),
  description: () => t("meta.system_access_log_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>