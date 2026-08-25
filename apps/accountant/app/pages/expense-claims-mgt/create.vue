<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/expense-claims-mgt" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Expense Claims Management',
            icon: 'material-symbols:receipt-long-rounded',
            to: '/expense-claims-mgt',
          },
          {
            label: 'Create Expense Claims Management',
            icon: 'material-symbols:receipt-long-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.expense_claims_mgt")),
  description: () => t("meta.expense_claims_mgt_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
