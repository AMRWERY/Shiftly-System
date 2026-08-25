<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/onboarding-offboarding" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Onboarding/Offboarding',
            icon: 'material-symbols:transfer-within-a-station-rounded',
            to: '/onboarding-offboarding',
          },
          {
            label: 'Create Onboarding/Offboarding',
            icon: 'material-symbols:transfer-within-a-station-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.onboarding_offboarding")),
  description: () => t("meta.onboarding_offboarding_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
