<template>
    <div>
        <main-layout>
            <main class="flex-1 overflow-x-hidden overflow-y-auto min-h-screen">
                <slot />
            </main>
        </main-layout>
    </div>
</template>

<script lang="ts" setup>
const localeStore = useLocaleStore();

onMounted(async () => {
    await localeStore.loadLocale();
});
</script>