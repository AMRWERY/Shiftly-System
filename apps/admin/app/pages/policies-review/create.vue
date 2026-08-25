<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/policies-review" />
      
      <LazyVBreadcrumb
        :items="[
          { label: 'Policies Review', icon: 'material-symbols:policy-rounded', to: '/policies-review' },
          { label: 'Create Policies Review', icon: 'material-symbols:policy-rounded' },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.policies_review")),
  description: () => t("meta.policies_review_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>