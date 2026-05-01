<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      career-path-mapping
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.career_path_mapping"),
  description: () => t("meta.career_path_mapping_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>