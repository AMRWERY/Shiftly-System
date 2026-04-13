<template>
    <div>
        <div class="card-bg p-6 flex flex-col h-fit">
            <h3 class="text-white font-semibold text-lg mb-8">Department Distribution</h3>

            <div class="relative flex justify-center items-center mb-10">
                <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
                    <!-- Background Track -->
                    <circle cx="80" cy="80" :r="radius" stroke="currentColor" stroke-width="14" fill="transparent"
                        class="text-white/5" />

                    <!-- Engineering (Blue) - 42% -->
                    <circle cx="80" cy="80" :r="radius" stroke-width="14" fill="transparent"
                        class="stroke-brand-primary" :stroke-dasharray="circumference"
                        :stroke-dashoffset="circumference * (1 - 0.42)" stroke-linecap="round" />

                    <!-- Sales (Green) - 28% (positioned after blue) -->
                    <circle cx="80" cy="80" :r="radius" stroke-width="14" fill="transparent" class="stroke-brand-accent"
                        :stroke-dasharray="circumference" :stroke-dashoffset="circumference * (1 - 0.28)"
                        :style="{ transform: `rotate(${0.42 * 360}deg)`, transformOrigin: 'center' }"
                        stroke-linecap="round" />
                </svg>

                <!-- Center Text -->
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-3xl font-bold text-white leading-none">1,248</span>
                    <span class="text-[10px] text-gray-500 font-bold tracking-widest mt-1">Employees</span>
                </div>
            </div>

            <!-- Legend -->
            <div class="grid grid-cols-2 gap-y-4 gap-x-2">
                <div v-for="item in data" :key="item.label" class="flex items-center gap-2">
                    <div :class="['w-2 h-2 rounded-full', item.dot]"></div>
                    <span class="text-[11px] text-gray-300 font-medium">
                        {{ item.label }} ({{ item.value }}%)
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Data matches the labels in the image
const data = [
    { label: 'Engineering', value: 42, color: 'stroke-brand-primary', dot: 'bg-brand-primary' },
    { label: 'Sales', value: 28, color: 'stroke-brand-accent', dot: 'bg-brand-accent' },
    { label: 'Operations', value: 15, color: 'stroke-slate-600', dot: 'bg-slate-600' },
    { label: 'HR', value: 15, color: 'stroke-slate-500', dot: 'bg-slate-500' },
];

// SVG Math: Circumference of circle (r=70) is ~440
const radius = 70;
const circumference = 2 * Math.PI * radius;
</script>