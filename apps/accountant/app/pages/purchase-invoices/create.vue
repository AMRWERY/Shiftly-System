<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/purchase-invoices" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Purchase Invoices',
            icon: 'material-symbols:shopping-cart-rounded',
            to: '/purchase-invoices',
          },
          {
            label: 'Create Purchase Invoices',
            icon: 'material-symbols:shopping-cart-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.purchase_invoices")),
  description: () => t("meta.purchase_invoices_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
