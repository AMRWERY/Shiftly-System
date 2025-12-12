<template>
    <div>
        <slot />
    </div>
</template>

<script setup>
const localeStore = useLocaleStore();

onMounted(async () => {
    await localeStore.loadLocale();
});
</script>