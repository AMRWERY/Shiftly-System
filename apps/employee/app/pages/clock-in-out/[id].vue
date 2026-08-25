<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/clock-in-out" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Clock In / Out',
            icon: 'material-symbols:fingerprint-rounded',
            to: '/clock-in-out',
          },
          {
            label: 'Clock Record Details',
            icon: 'material-symbols:fingerprint-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.clock_in_out"),
  description: t("meta.clock_in_out_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
