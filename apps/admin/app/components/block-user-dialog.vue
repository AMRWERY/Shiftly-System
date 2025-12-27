<template>
    <div>
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="show"
                    class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-3 relative modal-card">
                        <button @click="closeDialog" class="absolute top-4 end-4">
                            <icon name="material-symbols:close-small-rounded"
                                class="w-6 h-6 text-gray-400 hover:text-red-500" />
                        </button>

                        <div class="my-6 text-center">
                            <icon :name="isBlocked ? 'mdi:account-check-outline' : 'mdi:account-cancel-outline'"
                                :class="['w-20 h-20 mx-auto', isBlocked ? 'text-green-500' : 'text-orange-500']" />
                            <h4 class="text-slate-900 text-base font-medium mt-4">{{ dialogTitle }}</h4>
                            <p class="text-gray-600 mt-2">{{ dialogMessage }}</p>

                            <div class="text-center mt-10">
                                <button @click="closeDialog" type="button"
                                    class="px-5 py-2.5 rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200">
                                    {{ cancelText }}
                                </button>
                                <button @click="confirmAction" type="button"
                                    :class="['px-5 py-2.5 rounded-lg text-white text-sm font-medium ms-4',
                                        loading ? (isBlocked ? 'bg-green-400 cursor-not-allowed' : 'bg-orange-400 cursor-not-allowed') :
                                            (isBlocked ? 'bg-green-600 hover:bg-green-700 active:bg-green-600' : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-600')]"
                                    :disabled="loading">
                                    <icon v-if="loading" name="svg-spinners:270-ring" class="w-5 h-5 inline" />
                                    <span v-else>{{ confirmText }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import type { UserListItem } from '../../../../layers/base/types'

const { t } = useI18n()

const props = defineProps<{
    show: boolean
    user: UserListItem | null
    loading: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm'): void
}>()


const isBlocked = ref(false)

watch(() => props.show, (newValue) => {
    if (newValue && props.user) {
        isBlocked.value = props.user.status === 'blocked'
    }
}, { immediate: true })

const dialogTitle = computed(() => {
    return isBlocked.value ? t('dialog.unblock_user_title') : t('dialog.block_user_title')
})

const dialogMessage = computed(() => {
    if (!props.user) return ''
    const userName = props.user.fullName || props.user.email
    const messageKey = isBlocked.value ? 'dialog.unblock_user_message' : 'dialog.block_user_message'
    return t(messageKey).replace('{name}', userName)
})

const confirmText = computed(() => {
    return isBlocked.value ? t('btn.unblock') : t('btn.block')
})

const cancelText = computed(() => t('btn.cancel'))

const closeDialog = () => {
    emit('close')
}

const confirmAction = () => {
    emit('confirm')
}
</script>