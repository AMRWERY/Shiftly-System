<template>
    <div class="min-h-screen flex items-center justify-center relative p-4 lg:p-8">
        <!-- Back Button positioned absolutely -->
        <div class="absolute top-4 start-4 lg:top-8 lg:start-8 z-50">
            <back-button />
        </div>

        <!-- RTL Toggle positioned absolutely -->
        <div class="absolute top-4 end-4 lg:top-8 lg:end-8 z-50">
            <button
                class="text-gray-100 hover:text-white me-1 border border-gray-200/20 hover:border-gray-300/40 py-1.5 px-3 rounded-lg transition-all bg-white/5 backdrop-blur-sm"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-2" />
                    En
                </span>
                <span v-else class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-2" />
                    العربية
                </span>
            </button>
        </div>

        <!-- Main Card Container -->
        <div
            class="w-full max-w-4xl h-auto min-h-[450px] md:min-h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700/50 relative z-10 transition-all">
            <!-- Left Side - Dark Background with Information -->
            <div
                class="hidden md:flex md:w-4/12 bg-gradient-to-br from-indigo-900 via-brand-systemBg to-brand-layoutBg text-white p-10 flex-col justify-center border-e border-gray-700">
                <div class="max-w-md mx-auto">
                    <h1 class="text-3xl font-bold mb-4">{{ t('form.forgot_your_password_title') }}</h1>
                    <p class="text-gray-300 mb-10">
                        {{ t('form.forgot_your_password_desc') }}
                    </p>
                </div>
            </div>

            <!-- Right Side - Form -->
            <div class="w-full md:w-8/12 p-4 flex items-center justify-center bg-brand-systemBg">
                <div class="w-full max-w-lg">
                    <!-- reset-password component -->
                    <reset-password />
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
    // Get i18n instance and ensure messages are loaded first
    if (value === 'ar') {
        const arMessages = await import('../../i18n/locales/ar.json');
        setLocaleMessage('ar', arMessages.default || arMessages);
    } else {
        const enMessages = await import('../../i18n/locales/en.json');
        setLocaleMessage('en', enMessages.default || enMessages);
    }
    // Update locale store with preventNavigation flag to stay on same page
    await localeStore.updateLocale(value, true);
};

// Initialize direction on component mount
onMounted(() => {
    document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr';
});

definePageMeta({
    layout: 'auth'
});

useHead({
    titleTemplate: () => t('meta.reset_password'),
});
</script>