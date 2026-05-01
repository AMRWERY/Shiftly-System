<template>
    <div class="min-h-screen w-full flex items-center justify-center relative">
        <!-- RTL Toggle -->
        <div class="absolute top-4 end-4 z-50">
            <LazyVToggleLocales />
        </div>

        <!-- Card -->
        <LazyVCard flat
            class="w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/[0.06] z-10">
            <!-- Col 1 — Branding -->
            <div
                class="hidden md:flex md:w-1/3 flex-col items-center justify-center p-10 bg-[#0e1322] border-e border-white/5 text-white">
                <div class="text-center">
                    <h1 class="text-5xl font-black tracking-wider leading-tight mb-4">
                        NEXUS<br />ERP
                    </h1>
                    <p class="text-slate-400 text-base font-light">{{ t("meta.tagline") }}</p>
                    <div class="w-10 h-0.5 bg-indigo-500/40 mx-auto mt-8"></div>
                </div>
            </div>

            <!-- Col 2 — Login form -->
            <div class="w-full md:w-2/3 bg-[#0b0f1a] flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
                <div class="w-full max-w-xs">
                    <lazy-login />
                </div>
            </div>
        </LazyVCard>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

definePageMeta({
    layout: 'auth'
});

useSeoMeta({
    title: () => t("meta.login"),
    description: () => t("meta.login_description"),
});
</script>