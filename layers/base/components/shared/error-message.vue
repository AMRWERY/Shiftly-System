<template>
    <div>
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
            <p v-if="isVisible" class="font-semibold text-center text-transparent
               bg-gradient-to-r from-red-600 to-red-400
               bg-clip-text animate-success
               before:content-['X'] before:me-2">
                {{ message }}
            </p>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    message: string;
}>();

const isVisible = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

watch(() => props.message, (newMessage) => {
    // Clear any existing timeout
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    if (newMessage) {
        // Show the message
        isVisible.value = true;

        // Hide after 4 seconds
        timeoutId = setTimeout(() => {
            isVisible.value = false;
        }, 4000);
    } else {
        isVisible.value = false;
    }
}, { immediate: true });

// Clean up timeout on unmount
onUnmounted(() => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
});
</script>