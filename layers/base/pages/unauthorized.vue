<template>
    <div>
        <div class="justify-center">
            <div class="flex flex-col items-center justify-center mt-24">
                <img src="/svg/error-403.svg" alt="unauthorized" class="emoji-403" />

                <div class="mt-4 tracking-widest text-center">
                    <span class="block text-6xl text-gray-500">403</span>
                    <span class="block text-xl text-gray-500 mt-2">
                        {{ t('error_page.unauthorized_access') }}
                    </span>
                    <span class="block text-sm text-gray-400 mt-2">
                        {{ t('error_page.contact_admin') }}
                    </span>
                </div>

                <div class="mt-6">
                    <base-button :type="'button'" :variant="'outline'" :inline="true" :route="true" to="/"
                        :padding-x="'px-4'" :padding-y="'py-2'">
                        {{ t('btn.go_back_home') }}
                    </base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
    layout: 'auth'
})
</script>

<style scoped>
.emoji-403 {
    position: relative;
    animation: shake 2.5s infinite;
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px);
    }
}
</style>