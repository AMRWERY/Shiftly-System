<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/certifications" />

      <LazyVBreadcrumb
        :items="[
          {
            label: 'Certifications',
            icon: 'material-symbols:military-tech-rounded',
            to: '/certifications',
          },
          {
            label: 'Certification Details',
            icon: 'material-symbols:military-tech-rounded',
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: t("meta.certifications"),
  description: t("meta.certifications_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
