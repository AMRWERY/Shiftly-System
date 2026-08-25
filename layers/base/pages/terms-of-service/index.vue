<template>
  <div
    class="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="fixed top-4 start-4 z-50">
      <LazyVBackButton to="/auth" label-key="btn.back" />
    </div>

    <!-- RTL Toggle -->
    <div class="fixed top-4 end-4 z-50 flex gap-2">
      <LazyVToggleLocales />

      <LazyVToggleThemes />
    </div>

    <div class="max-w-4xl w-full mt-10">
      <!-- Header -->
      <div class="mb-12 text-center relative">
        <div
          class="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-2xl mb-6 ring-1 ring-cyan-500/20"
        >
          <Icon name="ph:file-text-duotone" class="w-10 h-10 text-cyan-400" />
        </div>
        <h1
          class="text-4xl md:text-5xl font-black dark:text-white mb-4 tracking-tight"
        >
          {{ t("meta.terms_of_service") }}
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          {{ t("meta.terms_of_service_description") }}
        </p>
        <div
          class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-8 rounded-full"
        ></div>
      </div>

      <!-- Content Card -->
      <LazyVCard
        flat
        class="p-8 md:p-12 border border-white/[0.05] dark:bg-[#0e1322]/80 backdrop-blur-xl shadow-2xl rounded-2xl relative overflow-hidden"
      >
        <div
          class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-transparent"
        ></div>

        <div class="space-y-12 text-base leading-relaxed">
          <section class="group">
            <h2
              class="text-2xl font-bold dark:text-white mb-4 flex items-center gap-3"
            >
              <span
                class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-black transition-colors group-hover:bg-cyan-500/20"
                >1</span
              >
              {{ t("terms_of_service.acceptance") }}
            </h2>
            <p class="text-slate-400">
              {{ t("terms_of_service.acceptance_text") }}
            </p>
          </section>

          <section class="group">
            <h2
              class="text-2xl font-bold dark:text-white mb-4 flex items-center gap-3"
            >
              <span
                class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-sm font-black transition-colors group-hover:bg-indigo-500/20"
                >2</span
              >
              {{ t("terms_of_service.use_license") }}
            </h2>
            <p class="mb-4 text-slate-300">
              {{ t("terms_of_service.use_license_text") }}
            </p>
            <ul class="list-none space-y-3">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle-fill"
                  class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5"
                />
                <span class="text-slate-400">{{
                  t("terms_of_service.no_modify")
                }}</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle-fill"
                  class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5"
                />
                <span class="text-slate-400">{{
                  t("terms_of_service.no_commercial")
                }}</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle-fill"
                  class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5"
                />
                <span class="text-slate-400">{{
                  t("terms_of_service.no_reverse")
                }}</span>
              </li>
            </ul>
          </section>

          <section class="group">
            <h2
              class="text-2xl font-bold dark:text-white mb-4 flex items-center gap-3"
            >
              <span
                class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-sm font-black transition-colors group-hover:bg-amber-500/20"
                >3</span
              >
              {{ t("terms_of_service.disclaimer") }}
            </h2>
            <div
              class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6"
            >
              <p class="text-slate-400">
                {{ t("terms_of_service.disclaimer_text") }}
              </p>
            </div>
          </section>

          <section class="group">
            <h2
              class="text-2xl font-bold dark:text-white mb-4 flex items-center gap-3"
            >
              <span
                class="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-sm font-black transition-colors group-hover:bg-rose-500/20"
                >4</span
              >
              {{ t("terms_of_service.limitations") }}
            </h2>
            <p class="text-slate-400">
              {{ t("terms_of_service.limitations_text") }}
            </p>
          </section>
        </div>
      </LazyVCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoPage({
  title: () => t("meta.terms_of_service"),
  description: () => t("meta.terms_of_service_description"),
});

definePageMeta({
  layout: "auth",
});
</script>