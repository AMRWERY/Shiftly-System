<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/accounts-receivable-payable" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Accounts Receivable/Payable',
            icon: 'material-symbols:account-balance-wallet-rounded',
            to: '/accounts-receivable-payable',
          },
          {
            label: 'Accounts Receivable/Payable Details',
            icon: 'material-symbols:account-balance-wallet-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.accounts_receivable_payable"),
  description: t("meta.accounts_receivable_payable_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
