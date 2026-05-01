<template>
    <div class="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="fixed top-4 start-4 z-50">
            <LazyVBackButton to="/auth" label-key="btn.back" />
        </div>

        <!-- RTL Toggle -->
        <div class="fixed top-4 end-4 z-50">
            <LazyVToggleLocales />
        </div>

        <div class="max-w-4xl w-full mt-10">
            <!-- Header -->
            <div class="mb-12 text-center relative">
                <div
                    class="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/20">
                    <Icon name="ph:shield-check-duotone" class="w-10 h-10 text-indigo-400" />
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    {{ t("meta.privacy_policy") }}
                </h1>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    {{ t("meta.privacy_policy_description") }}
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-8 rounded-full"></div>
            </div>

            <!-- Content Card -->
            <LazyVCard flat
                class="p-8 md:p-12 border border-white/[0.05] bg-[#0e1322]/80 backdrop-blur-xl shadow-2xl rounded-2xl relative overflow-hidden">
                <div class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>

                <div class="space-y-12 text-base leading-relaxed">
                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span
                                class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-sm font-black transition-colors group-hover:bg-indigo-500/20">1</span>
                            {{ t("privacy_policy.information_we_collect") }}
                        </h2>
                        <p class="mb-4 text-slate-300">
                            {{ t("privacy_policy.information_we_collect_text") }}
                        </p>
                        <ul class="list-none space-y-3">
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.account_information")
                                }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.authentication_data")
                                }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.data_input")
                                }}</span>
                            </li>
                        </ul>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span
                                class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-black transition-colors group-hover:bg-cyan-500/20">2</span>
                            {{ t("privacy_policy.how_we_use_data") }}
                        </h2>
                        <p class="mb-4 text-slate-300">
                            {{ t("privacy_policy.how_we_use_data_text") }}
                        </p>
                        <ul class="list-none space-y-3">
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.process_transactions")
                                }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.authenticate_users")
                                }}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                                <span class="text-slate-400">{{
                                    t("privacy_policy.analyze_usage")
                                }}</span>
                            </li>
                        </ul>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span
                                class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-black transition-colors group-hover:bg-purple-500/20">3</span>
                            {{ t("privacy_policy.data_security") }}
                        </h2>
                        <div class="bg-purple-500/5 border border-purple-500/10 rounded-xl p-6">
                            <p class="text-slate-400">
                                {{ t("privacy_policy.data_security_text") }}
                            </p>
                        </div>
                    </section>

                    <section class="group">
                        <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span
                                class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-black transition-colors group-hover:bg-emerald-500/20">4</span>
                            {{ t("privacy_policy.data_sharing") }}
                        </h2>
                        <p class="text-slate-400">
                            <strong class="text-slate-200">{{
                                t("privacy_policy.data_sharing_text")
                            }}</strong>
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
    layout: "auth",
});
</script>