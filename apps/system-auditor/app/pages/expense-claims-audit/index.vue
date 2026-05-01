<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      expense-claims-audit
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.expense_claims_audit"),
  description: () => t("meta.expense_claims_audit_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>