<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/expense-claim" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Expense Claim',
            icon: 'material-symbols:receipt-long-rounded',
            to: '/expense-claim',
          },
          {
            label: 'Create Expense Claim',
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
  title: computed(() => t("meta.expense_claim")),
  description: () => t("meta.expense_claim_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
