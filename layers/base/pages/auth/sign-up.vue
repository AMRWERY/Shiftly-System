<template>
    <div class="min-h-screen w-full flex items-center justify-center relative">
        <div class="absolute top-4 start-4 lg:top-8 lg:start-8 z-50">
            <LazyVBackButton to="/auth" label-key="form.back_to_login" />
        </div>

        <!-- RTL Toggle -->
        <div class="absolute top-4 end-4 lg:top-8 lg:end-8 z-50">
            <LazyVButton type="button" variant="outline" border-color="border-gray-200/20" text-color="text-gray-100"
                hover-color="hover:bg-white/10" padding-x="px-3" padding-y="py-1.5"
                class="me-1 rounded-lg hover:border-gray-300/40 bg-white/5 backdrop-blur-sm hover:text-white"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center">
                    <Icon name="heroicons:language" class="w-4 h-4 me-2" />
                    En
                </span>
                <span v-else class="flex items-center">
                    <Icon name="heroicons:language" class="w-4 h-4 me-2" />
                    العربية
                </span>
            </LazyVButton>
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
                    <p class="text-slate-400 text-base font-light">Manage everything. From one place.</p>
                    <div class="w-10 h-0.5 bg-indigo-500/40 mx-auto mt-8"></div>
                </div>
            </div>

            <!-- Col 2 — Sign-up form -->
            <div class="w-full md:w-3/4 bg-[#0b0f1a] flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
                <div class="w-full max-w-2xl py-4">
                    <!-- Header -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-white">{{ t('meta.sign_up') }}</h2>
                        <p class="text-slate-500 mt-1 text-sm">{{ t('form.welcome_message') }}</p>
                    </div>

                    <sign-up />
                </div>
            </div>
        </LazyVCard>
    </div>
</template>

<script lang="ts" setup>
const { setLocale, setLocaleMessage, t } = useI18n();
const localeStore = useLocaleStore();

watch(() => localeStore.isRTL, (isRTL) => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}, { immediate: true });

const switchLocale = async (value: SupportedLocale) => {
    localeStore.updateLocale(value);
    if (value === 'ar') {
        const arMessages = await import('../../i18n/locales/ar.json');
        setLocaleMessage('ar', arMessages.default || arMessages);
    } else {
        const enMessages = await import('../../i18n/locales/en.json');
        setLocaleMessage('en', enMessages.default || enMessages);
    }
    setLocale(value);
};

onMounted(() => {
    document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr';
});

definePageMeta({
    layout: 'auth'
});

useSeoPage({
    title: () => t("meta.sign_up"),
    description: () => t("meta.sign_up_description"),
    private: true,
});
</script>