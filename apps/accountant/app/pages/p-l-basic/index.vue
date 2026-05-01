<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">p-l-basic</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.p_l_basic"),
  description: () => t("meta.p_l_basic_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>
