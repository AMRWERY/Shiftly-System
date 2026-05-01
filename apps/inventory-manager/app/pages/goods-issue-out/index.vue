<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">goods-issue-out</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.goods_issue_out"),
  description: () => t("meta.goods_issue_out_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>