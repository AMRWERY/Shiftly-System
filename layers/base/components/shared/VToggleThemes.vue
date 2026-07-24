<template>
    <div>
        <LazyVButton type="button" variant="ghost" padding-x="px-0" padding-y="py-0"
            :title="isDark ? t('theme.switch_light', 'Switch to light theme') : t('theme.switch_dark', 'Switch to dark theme')"
            class="h-8 px-2 gap-1.5 flex items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-hover)] hover:bg-[var(--bg-hover-strong)] text-tx-secondary hover:text-tx-primary transition-all duration-300 flex-shrink-0"
            @click="toggleDark()">
            <Transition name="fade" mode="out-in">
                <Icon v-if="isDark" :key="'light-icon'" name="material-symbols:light-mode-outline-rounded"
                    class="w-4 h-4 text-amber-500 animate-spin-once" />
                <Icon v-else :key="'dark-icon'" name="material-symbols:dark-mode-outline-rounded"
                    class="w-4 h-4 text-indigo-500" />
            </Transition>
        </LazyVButton>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

// Use VueUse's useDark to handle theme state and apply light/dark classes on <html>.
// By default, initialValue is set to 'dark' to guarantee dark mode is the default.
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    initialValue: 'dark',
})

// Custom toggleDark function to execute circular clip-path transition from top-left corner
const toggleDark = () => {
    const doc = document as any
    if (!doc.startViewTransition) {
        isDark.value = !isDark.value
        return
    }

    const transition = doc.startViewTransition(() => {
        isDark.value = !isDark.value
    })

    transition.ready.then(() => {
        // Calculate radius to fully cover screen from top-left (0,0)
        const endRadius = Math.hypot(window.innerWidth, window.innerHeight)

        document.documentElement.animate(
            {
                clipPath: [
                    'circle(0px at 0px 0px)',
                    `circle(${endRadius}px at 0px 0px)`
                ]
            },
            {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                pseudoElement: '::view-transition-new(root)'
            }
        )
    })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: rotate(-30deg) scale(0.9);
}

.fade-leave-to {
    opacity: 0;
    transform: rotate(30deg) scale(0.9);
}

@keyframes spin-once {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-once {
    animation: spin-once 0.4s ease-out;
}
</style>

<!-- Global View Transitions API customizations -->
<style>
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root) {
    z-index: 1;
}

::view-transition-new(root) {
    z-index: 9999;
}
</style>