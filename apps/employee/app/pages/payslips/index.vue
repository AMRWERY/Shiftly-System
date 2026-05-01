<template>
  <div class="p-10 space-y-6">

    <!-- Live badges -->
    <div class="flex flex-wrap items-center gap-3">
      <LazyVBadge variant="active" label="Active" />
      <LazyVBadge variant="inactive" label="Inactive" />
      <LazyVBadge variant="pending" label="Pending" />
      <LazyVBadge variant="rejected" label="Rejected" />
      <LazyVBadge variant="approved" label="Approved" />
      <LazyVBadge variant="processing" label="Processing" />
    </div>

    <!-- Skeleton states -->
    <div class="flex flex-wrap items-center gap-3">
      <LazyVBadgeSkeleton v-for="i in 6" :key="i" />
    </div>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.payslips"),
  description: () => t("meta.payslips_description"),
  private: true,
});

definePageMeta({
  layout: 'dashboard'
})
</script>