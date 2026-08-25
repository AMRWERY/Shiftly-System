<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/quick-access-contacts" />
      <LazyVBreadcrumb :items="[{ label: 'Quick Access Contacts', icon: 'material-symbols:contacts-rounded', to: '/quick-access-contacts' }, { label: 'Create Contact', icon: 'material-symbols:contacts-rounded' }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useSeoPage({ title: computed(() => t("meta.quick_access_contacts")), description: () => t("meta.quick_access_contacts_description"), private: true });
definePageMeta({ layout: "dashboard" });
</script>
