<template>
    <div>
        <div class="card-bg p-5 flex justify-between items-start">
            <div>
                <p class="text-gray-400 text-sm font-medium mb-2">{{ label }}</p>
                <div class="flex items-baseline gap-2">
                    <h2 class="text-3xl font-bold text-tx-primary">{{ value }}</h2>
                    <span v-if="trend" :class="trendUp ? 'text-brand-accent' : 'text-brand-danger'"
                        class="text-xs font-bold flex items-center">
                        <span v-if="trendUp">↗</span><span v-else>↘</span> {{ trend }}
                    </span>
                </div>
            </div>
            <div
                :class="[iconBg, 'w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] shadow-inner flex-shrink-0']">
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    iconBg: string;
    iconColor: string;
}>();
</script>