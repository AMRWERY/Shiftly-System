<template>
    <div>
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="modelValue"
                    class="fixed inset-0 p-4 flex flex-wrap justify-end items-end w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">

                    <div class="absolute inset-0 bg-black/50" @click="closeOnOverlay && closeDialog"></div>

                    <div class="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6 z-[1001]">
                        <div class="flex items-center pb-3 border-b border-gray-300">
                            <h3 class="text-slate-900 text-xl font-semibold flex-1">
                                {{ title }}
                            </h3>
                            <icon name="material-symbols:close-small-rounded"
                                class="ms-2 cursor-pointer shrink-0 text-gray-400 hover:text-red-500 w-5 h-5"
                                @click="closeDialog" />
                        </div>

                        <div class="my-6">
                            <slot name="body">
                                <p class="text-slate-600 text-sm leading-relaxed">
                                    {{ message }}
                                </p>
                            </slot>
                        </div>

                        <div class="border-t border-gray-300 pt-6 flex justify-end gap-2"
                            v-if="$slots.footer || showDefaultFooter">
                            <slot name="footer">
                                <base-button v-if="showDefaultFooter" :default-icon="false" :type="'button'"
                                    :hover-color="'hover:bg-gray-800'" :text-color="'text-white'" :variant="'solid'"
                                    :padding-x="'px-4'" :padding-y="'py-2.5'"
                                    class="flex items-center justify-center rounded-lg border-2 transition-colors group"
                                    @click="closeDialog">
                                    {{ confirmText }}
                                </base-button>
                            </slot>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: 'Dialog Title' },
    message: { type: String, default: '' },
    confirmText: { type: String, default: 'OK' },
    closeOnOverlay: { type: Boolean, default: true },
    showDefaultFooter: { type: Boolean, default: true },
});

const emit = defineEmits(['update:modelValue', 'confirm', 'close']);

const closeDialog = () => {
    emit('update:modelValue', false);
    emit('close');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>