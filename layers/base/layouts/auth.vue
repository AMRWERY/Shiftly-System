<template>
    <div class="min-h-screen w-full bg-bg-base text-tx-secondary font-sans relative">
        <!-- Background layer -->
        <div class="absolute inset-0" />
        <!-- Content layer -->
        <div class="relative p-8">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const localeStore = useLocaleStore();

onMounted(async () => {
    await localeStore.loadLocale();
});
</script>