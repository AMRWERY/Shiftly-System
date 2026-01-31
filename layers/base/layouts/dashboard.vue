<template>
    <div class="min-h-screen w-full bg-brand-layoutBg relative">
        <!-- Background layer -->
        <div
            class="absolute inset-0"
            :style="{
                backgroundImage: `linear-gradient(45deg, transparent 49%, #5a5a8a 49%, #5a5a8a 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #5a5a8a 49%, #5a5a8a 51%, transparent 51%)`,
                backgroundSize: '40px 40px',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)',
                maskImage: 'radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)',
            }"
        />
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