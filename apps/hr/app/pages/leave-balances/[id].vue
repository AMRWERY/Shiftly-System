<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/leave-balances" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Leave Balances',
            icon: 'material-symbols:event-available-rounded',
            to: '/leave-balances',
          },
          {
            label: 'Leave Balance Details',
            icon: 'material-symbols:event-available-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.leave_balances"),
  description: t("meta.leave_balances_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
