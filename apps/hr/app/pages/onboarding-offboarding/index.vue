<template>
  <div>
    <div>
      <div class="mt-3 mb-6">
        <LazyVBreadcrumb
          :items="[
            {
              label: 'Onboarding/Offboarding',
              icon: 'material-symbols:transfer-within-a-station-rounded',
            },
          ]"
        />
      </div>

      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-100">
          Onboarding/Offboarding
        </h1>
        <div class="flex space-s-4">
          <LazyVDownloadFilesMenu :all-items="[]" :columns="[]" />

          <LazyVRefreshButton />

          <LazyVButton
            color="primary"
            size="sm"
            to="/onboarding-offboarding/create"
            :padding-x="'px-3'"
            :padding-y="'py-2.5'"
            :rounded="'rounded-lg'"
            :block="true"
            >Add New</LazyVButton
          >
        </div>
      </div>

      <LazyVTable :columns="[]" :items="[]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.onboarding_offboarding"),
  description: () => t("meta.onboarding_offboarding_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>