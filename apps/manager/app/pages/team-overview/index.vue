<template>
  <div>
    <p class="p-10 space-y-10 text-3xl font-semibold text-tx-primary">
      team-overview
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.team_overview"),
  description: () => t("meta.team_overview_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>