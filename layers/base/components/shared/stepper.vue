<template>
    <div>
        <div class="w-full">
            <div class="relative w-full">
                <!-- full gray track (base) -->
                <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-300 z-0"></div>

                <!-- gray progress track -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-500 z-5 transition-all duration-300"
                    :style="{ width: progressWidth }"></div>

                <div class="relative z-10 flex justify-between items-center">
                    <div v-for="(label, i) in steps" :key="i"
                        class="flex flex-col items-center gap-2 bg-transparent">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-offset-2 transition-all"
                            :class="circleClasses(i)">
                            <span v-if="currentStep > i">
                                <icon name="material-symbols:check-rounded"
                                    class="w-4 h-4 text-white flex items-center justify-center" />
                            </span>
                            <span v-else class="text-sm font-medium">
                                {{ i + 1 }}
                            </span>
                        </div>

                        <!-- optional short label under step (enable by passing `labels` prop) -->
                        <span v-if="labels" class="text-xs text-gray-600 text-center max-w-[6rem]">
                            {{ steps[i] }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    steps: string[];
    currentStep: number;
    labels?: boolean;
}>();

defineEmits<{
    (e: "step-change", index: number): void;
}>();

const progressWidth = computed(() => {
    const { steps, currentStep } = props;
    if (!steps || steps.length <= 1) return "0%";
    const pct = (currentStep / (steps.length - 1)) * 100;
    return `${pct}%`;
});

// returns class string array for circle depending on state
const circleClasses = (index: number) => {
    if (props.currentStep > index) {
        // completed: keep ring (gray ring) and filled gray circle
        return "bg-gray-500 text-white ring-gray-500";
    }
    if (props.currentStep === index) {
        // active: white inner with black ring (outline visible)
        return "bg-white text-black ring-black";
    }
    // upcoming: white inner with gray ring (outline)
    return "bg-white text-gray-500 ring-gray-300";
};
</script>