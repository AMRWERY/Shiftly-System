<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/goods-issue-out" />
      <LazyVBreadcrumb :items="[{ label: 'Goods Issue Out', icon: 'material-symbols:upload-rounded', to: '/goods-issue-out' }, { label: 'Create Goods Issue', icon: 'material-symbols:upload-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.goods_issue_out")), description: () => t("meta.goods_issue_out_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
