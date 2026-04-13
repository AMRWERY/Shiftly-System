<template>
    <nuxt-link-locale v-if="to" :to="to"
        class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
        <Icon name="ph:arrow-left" class="w-4 h-4 rtl:rotate-180" />
        <slot>
            <span>{{ displayLabel }}</span>
        </slot>
    </nuxt-link-locale>
    <button v-else type="button"
        class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        @click="router.back()">
        <Icon name="ph:arrow-left" class="w-4 h-4 rtl:rotate-180" />
        <slot>
            <span>{{ displayLabel }}</span>
        </slot>
    </button>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        /** When set, navigates with locale-aware routing. Omit to use browser history back. */
        to?: string
        /** i18n key for the label (ignored if default slot has content) */
        labelKey?: string
    }>(),
    { labelKey: 'btn.back' }
)

const { t } = useI18n()
const router = useRouter()

const displayLabel = computed(() => t(props.labelKey))
</script>
