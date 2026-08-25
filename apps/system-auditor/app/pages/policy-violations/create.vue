<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/policy-violations" />
      <LazyVBreadcrumb :items="[{ label: 'Policy Violations', icon: 'material-symbols:gpp-bad-rounded', to: '/policy-violations' }, { label: 'Create Violation Record', icon: 'material-symbols:gpp-bad-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.policy_violations")), description: () => t("meta.policy_violations_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
