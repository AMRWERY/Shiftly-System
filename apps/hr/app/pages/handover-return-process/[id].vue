<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/handover-return-process" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Handover/Return Process',
            icon: 'material-symbols:swap-horiz-rounded',
            to: '/handover-return-process',
          },
          {
            label: 'Handover/Return Details',
            icon: 'material-symbols:swap-horiz-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.handover_return_process"),
  description: t("meta.handover_return_process_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
