<template>
    <div class="min-h-screen flex items-center justify-center relative p-4 lg:p-8">
        <!-- RTL Toggle positioned absolutely -->
        <div class="absolute top-4 end-4 lg:top-8 lg:end-8 z-50">
            <VButton
                type="button"
                variant="outline"
                border-color="border-gray-200/20"
                text-color="text-gray-100"
                hover-color="hover:bg-white/10"
                padding-x="px-3"
                padding-y="py-1.5"
                class="me-1 rounded-lg hover:border-gray-300/40 bg-white/5 backdrop-blur-sm hover:text-white"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')"
            >
                <span v-if="localeStore.isRTL" class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-2" />
                    En
                </span>
                <span v-else class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-2" />
                    العربية
                </span>
            </VButton>
        </div>

        <!-- Main Card Container -->
        <div
            class="w-full max-w-4xl h-[600px] md:h-[550px] lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700/50 relative z-10 transition-all">
            <!-- Left Side - Dark Background with Information -->
            <div
                class="hidden md:flex md:w-4/12 bg-gradient-to-br from-indigo-900 via-brand-systemBg to-brand-layoutBg text-white p-10 flex-col justify-center border-e border-gray-700">
                <div class="max-w-md mx-auto">
                    <h1 class="text-3xl font-bold mb-4">{{ t('btn.log_in') }}</h1>
                    <p class="text-gray-400 mb-10">
                        {{ t('form.welcome_message') }}
                    </p>

                    <h2 class="text-2xl font-bold mb-4">{{ t('form.simple_secure') }}</h2>
                    <p class="text-gray-300">
                        {{ t('form.security_message') }}
                    </p>
                </div>
            </div>

            <!-- Right Side - Form -->
            <!-- Added overflow-y-auto to handle content overflow -->
            <div class="w-full md:w-8/12 p-4 flex items-center justify-center bg-brand-systemBg overflow-y-auto">
                <div class="w-full max-w-lg">
                    <!-- login component -->
                    <login />
                </div>
            </div>
        </div>
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
    // Get i18n instance and ensure messages are loaded
    if (value === 'ar') {
        const arMessages = await import('../../i18n/locales/ar.json');
        setLocaleMessage('ar', arMessages.default || arMessages);
    } else {
        const enMessages = await import('../../i18n/locales/en.json');
        setLocaleMessage('en', enMessages.default || enMessages);
    }
    // Now set the locale
    setLocale(value);
};

// Initialize direction on component mount
onMounted(() => {
    document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr';
});

definePageMeta({
    layout: 'auth'
});

useHead({
    titleTemplate: () => t('meta.auth'),
});
</script>