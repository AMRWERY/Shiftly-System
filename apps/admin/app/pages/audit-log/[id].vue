<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/audit-log" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Audit Log',
            icon: 'material-symbols:fact-check-rounded',
            to: '/audit-log',
          },
          {
            label: 'Audit Log Details',
            icon: 'material-symbols:fact-check-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.audit_log"),
  description: t("meta.audit_log_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>