<template>
  <div>
    <div class="mt-3 mb-6 space-y-4">
      <LazyVBackButton to="/users" />
      
      <LazyVBreadcrumb
        :items="[
          { label: 'Users', icon: 'material-symbols:group-rounded', to: '/users' },
          { label: 'Create User', icon: 'material-symbols:group-rounded' },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: computed(() => t("meta.create_user")),
  description: () => t("meta.create_user_description"),
  private: true,
});

definePageMeta({
  layout: "dashboard",
});
</script>
