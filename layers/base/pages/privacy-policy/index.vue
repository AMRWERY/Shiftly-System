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
                <div class="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/20">
                    <Icon name="ph:shield-check-duotone" class="w-10 h-10 text-indigo-400" />
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    {{ t('meta.privacy_policy') }}
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    How we collect, use, and protect your data at Nexux ERP.
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-8 rounded-full"></div>
            </div>

            <!-- Content Card -->
            <LazyVCard flat class="p-8 md:p-12 border border-white/[0.05] bg-[#0e1322]/80 backdrop-blur-xl shadow-2xl rounded-2xl relative overflow-hidden">
                <div class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                
                <div class="space-y-12 text-base leading-relaxed">
                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-sm font-black transition-colors group-hover:bg-indigo-500/20">1</span>
                            Information We Collect
                        </h2>
                        <p class="mb-4 text-slate-300">
                            We collect information that you provide directly to us when using Nexux ERP. This includes:
                        </p>
                        <ul class="list-none space-y-3">
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Account information (name, email address, company details)</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Authentication data and security credentials</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Data you input into the ERP system during regular use</span>
                            </li>
                        </ul>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-black transition-colors group-hover:bg-cyan-500/20">2</span>
                            How We Use Your Data
                        </h2>
                        <p class="mb-4 text-slate-300">
                            Your data is strictly used to provide, maintain, and improve our services. Specifically, we use it to:
                        </p>
                        <ul class="list-none space-y-3">
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Process transactions and deliver platform functionalities</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Authenticate users and enforce security protocols</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">Analyze usage patterns to improve user experience</span>
                            </li>
                        </ul>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-black transition-colors group-hover:bg-purple-500/20">3</span>
                            Data Security
                        </h2>
                        <div class="bg-purple-500/5 border border-purple-500/10 rounded-xl p-6">
                            <p class="text-slate-400">
                                We implement enterprise-grade security measures to protect your data. All data is encrypted at rest and in transit using industry-standard cryptographic protocols. Access to infrastructure is strictly regulated through zero-trust architectures and continuous monitoring.
                            </p>
                        </div>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-black transition-colors group-hover:bg-emerald-500/20">4</span>
                            Data Sharing
                        </h2>
                        <p class="text-slate-400">
                            We <strong class="text-slate-200">do not sell, rent, or trade</strong> your personal or business data to third parties. We may share necessary information with trusted infrastructure providers solely for the purpose of operating our service. All partners are bound by strict confidentiality agreements.
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
    title: () => t("meta.privacy_policy"),
    description: () => t("meta.privacy_policy_description"),
});

definePageMeta({
    layout: 'auth'
});
</script>