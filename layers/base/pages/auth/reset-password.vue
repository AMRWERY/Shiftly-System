<template>
  <div class="min-h-screen w-full flex items-center justify-center relative">
    <div class="absolute top-4 start-4 z-50">
      <LazyVBackButton to="/auth" label-key="form.back_to_login" />
    </div>

    <!-- RTL Toggle -->
    <div class="absolute top-4 end-4 z-50 flex items-center gap-2">
      <LazyVToggleLocales />

      <LazyVToggleThemes />
    </div>

    <!-- Focused card -->
    <LazyVCard
      flat
      class="w-full max-w-md bg-bg-primary border border-[var(--border-default)] rounded-2xl shadow-2xl p-8 z-10"
    >
      <lazy-reset-password />
    </LazyVCard>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});

useSeoPage({
  title: () => t("meta.reset_password"),
  description: () => t("meta.reset_password_description"),
  private: true,
});
</script>