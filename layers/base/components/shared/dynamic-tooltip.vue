<template>
    <div>
        <div class="relative inline-block group/tooltip">
            <!-- Trigger -->
            <div class="flex items-center justify-center">
                <slot />
            </div>

            <!-- Tooltip -->
            <div v-if="text || $slots.content" role="tooltip" :class="[
                'absolute z-[100] pointer-events-none opacity-0 group-hover/tooltip:opacity-100 scale-95 group-hover/tooltip:scale-100 transition-all duration-200 ease-out',
                positionClasses[currentPosition]
            ]">
                <div
                    class="relative px-3 py-1.5 text-[11px] font-bold text-gray-200 bg-[#161B22] border border-gray-800 rounded-lg shadow-2xl whitespace-nowrap tracking-wide min-w-max">
                    <slot name="content">
                        {{ text }}
                    </slot>

                    <!-- Arrow -->
                    <div :class="[
                        'absolute w-2 h-2 rotate-45 bg-[#161B22] border-gray-800 z-[-1]',
                        arrowClasses[currentPosition]
                    ]"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TooltipProps } from '../../types/tooltips';

const props = withDefaults(defineProps<TooltipProps>(), {
    position: 'top'
});

const currentPosition = computed(() => props.position);

const positionClasses = {
    top: 'bottom-full start-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full start-1/2 -translate-x-1/2 mt-2',
    left: 'end-full top-1/2 -translate-y-1/2 me-3',
    right: 'start-full top-1/2 -translate-y-1/2 ms-3',
};

const arrowClasses = {
    top: 'bottom-0 start-1/2 -translate-x-1/2 translate-y-1/2 border-b border-e',
    bottom: 'top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 border-t border-s',
    left: 'end-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-t border-e',
    right: 'start-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-b border-s',
};
</script>