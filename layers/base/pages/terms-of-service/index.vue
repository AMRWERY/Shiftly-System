<template>
    <div class="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="absolute top-4 start-4 z-50">
            <LazyVBackButton to="/auth" label-key="btn.back" />
        </div>

        <!-- RTL Toggle -->
        <div class="absolute top-4 end-4 z-50">
            <LazyVToggleLocales />
        </div>

        <div class="max-w-4xl w-full mt-10">
            <!-- Header -->
            <div class="mb-12 text-center relative">
                <div class="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-2xl mb-6 ring-1 ring-cyan-500/20">
                    <Icon name="ph:file-text-duotone" class="w-10 h-10 text-cyan-400" />
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    {{ t('meta.terms_of_service') }}
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    The rules, guidelines, and agreements for using Nexux ERP.
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
            </div>

            <!-- Content Card -->
            <LazyVCard flat class="p-8 md:p-12 border border-white/[0.05] bg-[#0e1322]/80 backdrop-blur-xl shadow-2xl rounded-2xl relative overflow-hidden">
                <div class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>

                <div class="space-y-12 text-base leading-relaxed">
                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-black transition-colors group-hover:bg-cyan-500/20">1</span>
                            Acceptance of Terms
                        </h2>
                        <p class="text-slate-400">
                            By accessing and using Nexux ERP, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                        </p>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-sm font-black transition-colors group-hover:bg-indigo-500/20">2</span>
                            Use License
                        </h2>
                        <p class="mb-4 text-slate-300">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Nexux ERP's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul class="list-none space-y-3">
                            <li class="flex items-start gap-3">
                                <Icon name="ph:x-circle-fill" class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Modify or copy the materials</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:x-circle-fill" class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Use the materials for any commercial purpose, or for any public display</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:x-circle-fill" class="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Attempt to decompile or reverse engineer any software contained on the platform</span>
                            </li>
                        </ul>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-sm font-black transition-colors group-hover:bg-amber-500/20">3</span>
                            Disclaimer
                        </h2>
                        <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6">
                            <p class="text-slate-400">
                                The materials on Nexux ERP's platform are provided on an 'as is' basis. Nexux ERP makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </div>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-sm font-black transition-colors group-hover:bg-rose-500/20">4</span>
                            Limitations
                        </h2>
                        <p class="text-slate-400">
                            In no event shall Nexux ERP or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nexux ERP's platform.
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
    layout: 'auth'
});
</script>