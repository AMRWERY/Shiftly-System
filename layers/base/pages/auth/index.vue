<template>
    <div>
        <div class="flex items-center justify-end ms-auto p-10">
            <!-- RTL Toggle -->
            <button
                class="text-gray-600 hover:text-gray-800 me-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                    En
                </span>
                <span v-else class="flex items-center">
                    <icon name="heroicons:language" class="w-4 h-4 me-1.5" />
                    العربية
                </span>
            </button>
        </div>

        <div class="flex items-center justify-center p-4">

            <!-- Added fixed height here -->
            <div class="flex w-full max-w-4xl h-[500px] rounded-lg shadow-xl overflow-hidden">
                <!-- Left Side - Dark Background with Information -->
                <div
                    class="hidden md:flex md:w-4/12 bg-gradient-to-l from-gray-900 to-gray-600 text-white p-10 flex-col justify-center">
                    <div class="max-w-md mx-auto">
                        <h1 class="text-3xl font-bold mb-4">{{ t('form.create_your_account') }}</h1>
                        <p class="text-gray-300 mb-10">
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
                <div class="w-full md:w-8/12 p-4 flex items-center justify-center bg-white overflow-y-auto">
                    <div class="w-full max-w-lg">
                        <ul class="flex mb-8 gap-2">
                            <li @click="activeTab = 'signup'" :class="[
                                'tab w-full flex-1 items-center justify-center rounded-lg border-2 transition-colors group cursor-pointer text-center py-2',
                                activeTab === 'signup'
                                    ? 'base-btn-bg base-btn-bg:hover text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            ]">
                                {{ t('btn.sign_up') }}
                            </li>
                            <li @click="activeTab = 'login'" :class="[
                                'tab w-full flex-1 items-center justify-center rounded-lg border-2 transition-colors group cursor-pointer text-center py-2',
                                activeTab === 'login'
                                    ? 'base-btn-bg base-btn-bg:hover text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            ]">
                                {{ t('btn.log_in') }}
                            </li>
                        </ul>

                        <!-- login component -->
                        <login v-if="activeTab === 'login'" />

                        <!-- sign-up component -->
                        <sign-up v-else />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { setLocale, setLocaleMessage, t } = useI18n();
const localeStore = useLocaleStore();
const activeTab = ref<"login" | "signup">("signup");

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
    titleTemplate: () => t('head.auth'),
});
</script>