<template>
    <div>
        <div class="mb-6">
            <VButton variant="outline" :padding-x="'px-3'" :padding-y="'py-2.5'"
                class="flex items-center gap-2 text-gray-300 hover:text-white" @click="router.back()">
                <icon name="heroicons:arrow-left" class="w-4 h-4 me-1 rtl:rotate-180" />
                <span>{{ t("btn.back") }}</span>
            </VButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const router = useRouter();
</script>