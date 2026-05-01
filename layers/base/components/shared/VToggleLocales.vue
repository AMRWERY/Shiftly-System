<template>
    <div>
        <LazyVButton type="button" variant="ghost" padding-x="px-0" padding-y="py-0"
            :title="localeStore.isRTL ? 'Switch to English' : 'التبديل إلى العربية'"
            class="h-8 px-2 gap-1 flex items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-hover)] hover:bg-[var(--bg-hover-strong)] text-tx-secondary hover:text-tx-primary transition-colors flex-shrink-0"
            @click="switchLocale(localeStore.isRTL ? 'en' : 'ar')">
            <Icon name="heroicons:language" class="w-4 h-4" />
            <span class="text-xs font-medium leading-none">{{ localeStore.isRTL ? 'En' : 'ع' }}</span>
        </LazyVButton>
    </div>
</template>

<script lang="ts" setup>
const { setLocale, setLocaleMessage } = useI18n()
const localeStore = useLocaleStore()

watch(
    () => localeStore.isRTL,
    (isRTL) => { document.documentElement.dir = isRTL ? 'rtl' : 'ltr' },
    { immediate: true },
)

const switchLocale = async (value: SupportedLocale) => {
    localeStore.updateLocale(value)
    if (value === 'ar') {
        const msgs = await import('@/layers/base/i18n/locales/ar.json')
        setLocaleMessage('ar', msgs.default || msgs)
    } else {
        const msgs = await import('@/layers/base/i18n/locales/en.json')
        setLocaleMessage('en', msgs.default || msgs)
    }
    setLocale(value)
}

onMounted(() => {
    document.documentElement.dir = localeStore.isRTL ? 'rtl' : 'ltr'
})
</script>