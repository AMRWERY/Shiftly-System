<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/budget-approvals" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Budget Approvals',
            icon: 'material-symbols:account-balance-wallet',
            to: '/budget-approvals',
          },
          {
            label: 'Create Budget Approval',
            icon: 'material-symbols:account-balance-wallet',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.budget_approvals")),
  description: () => t("meta.budget_approvals_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
