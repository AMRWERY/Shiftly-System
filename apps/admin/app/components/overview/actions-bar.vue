<template>
    <div>
        <div class="bg-brand-primary/5 border border-brand-primary/10 p-3 rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="bg-brand-primary p-2 rounded-lg shadow-lg shadow-blue-500/20">
                    <img src="/svg/actions-lightning.svg" class="w-5 h-5" alt="actions" />
                </div>
                <span class="text-brand-primary font-semibold text-sm">Pending Actions Required</span>

                <div class="flex gap-2 ms-4">
                    <div v-for="action in actions" :key="action.label"
                        class="bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700 flex items-center gap-2">
                        <div :class="['w-2 h-2 rounded-full', action.dot]"></div>
                        <span class="text-xs text-gray-300">{{ action.label }}</span>
                    </div>
                </div>
            </div>
            <LazyVButton :variant="'ghost'" :text-color="'text-brand-primary'" :type="'button'"
                class="text-xs hover:underline decoration-brand-primary/30 underline-offset-4">
                View All Action Items
            </LazyVButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const actions = [
    { label: '12 Leave Requests', color: 'text-amber-400', dot: 'bg-amber-400' },
    { label: '5 Expense Claims', color: 'text-rose-400', dot: 'bg-rose-400' },
    { label: '3 Purchase Orders', color: 'text-indigo-400', dot: 'bg-indigo-400' },
];
</script>