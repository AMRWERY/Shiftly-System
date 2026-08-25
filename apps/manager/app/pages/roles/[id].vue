<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/roles" />
      <LazyVBreadcrumb :items="[{ label: 'Roles', icon: 'material-symbols:shield-person-rounded', to: '/roles' }, { label: 'Role Details', icon: 'material-symbols:shield-person-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: t("meta.roles"), description: t("meta.roles_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
