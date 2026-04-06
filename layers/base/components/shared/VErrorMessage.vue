<template>
    <div>
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
            <p v-if="visible" class="font-semibold text-center text-transparent
               bg-gradient-to-r from-red-600 to-red-400
               bg-clip-text animate-success
               before:content-['X'] before:me-2">
                {{ errorMessage }}
            </p>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    errorMessage: string;
}>();

const visible = ref(false);
const { start: startHideTimer, stop: stopHideTimer } = useTimeoutFn(() => {
    visible.value = false;
}, 4000, { immediate: false });

watch(() => props.errorMessage, (newMessage) => {
    stopHideTimer();
    if (newMessage) {
        visible.value = true;
        startHideTimer();
    } else {
        visible.value = false;
    }
}, { immediate: true });
</script>