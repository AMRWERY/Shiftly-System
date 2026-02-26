<template>
    <div class="min-h-screen w-full bg-brand-systemBg relative">
        <!-- Content layer -->
        <div class="relative">
            <main-layout>
                <main>
                    <slot />
                </main>
            </main-layout>
        </div>
    </div>
</template>

<script lang="ts" setup>
const localeStore = useLocaleStore();

onMounted(async () => {
    await localeStore.loadLocale();
});
</script>