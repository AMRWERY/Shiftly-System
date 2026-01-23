<template>
    <div>
        <div class="mb-6">
            <base-button variant="outline" :padding-x="'px-3'" :padding-y="'py-2.5'"
                class="flex items-center gap-2 text-gray-500 hover:text-gray-700" @click="router.back()">
                <icon name="heroicons:arrow-left" class="w-4 h-4 me-1 rtl:rotate-180" />
                <span>{{ t("btn.back") }}</span>
            </base-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const router = useRouter();
</script>