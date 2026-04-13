<template>
    <div class="min-h-screen w-full  flex items-center justify-center relative">
        <div class="absolute top-4 start-4 lg:top-8 lg:start-8 z-50">
            <LazyVBackButton to="/auth" label-key="form.back_to_login" />
        </div>
        <!-- RTL Toggle -->
        <div class="absolute top-4 end-4 lg:top-8 lg:end-8 z-50">
            <LazyVButton type="button" variant="outline" border-color="border-gray-200/20" text-color="text-gray-100"
                hover-color="hover:bg-white/10" padding-x="px-3" padding-y="py-1.5"
                class="rounded-lg hover:border-gray-300/40 bg-white/5 backdrop-blur-sm hover:text-white"
                @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
                <span v-if="localeStore.isRTL" class="flex items-center gap-2">
                    <Icon name="heroicons:language" class="w-4 h-4" /> En
                </span>
                <span v-else class="flex items-center gap-2">
                    <Icon name="heroicons:language" class="w-4 h-4" /> العربية
                </span>
            </LazyVButton>
        </div>

        <!-- Focused card -->
        <LazyVCard flat class="w-full max-w-md bg-[#0e1322] border border-white/[0.06] rounded-2xl shadow-2xl p-8 z-10">
            <reset-password />
        </LazyVCard>
    </div>
</template>

<script lang="ts" setup>
const { setLocaleMessage, t } = useI18n();
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