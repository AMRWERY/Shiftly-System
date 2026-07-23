<template>
    <button type="button" :disabled="disabled"
        class="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none ring-offset-2 ring-offset-[#0B0E14] focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
            isToggled ? colorClass : 'bg-gray-700/60',
            disabled ? '' : 'cursor-pointer'
        ]" :style="inlineStyles" @click="toggle">
        <span class="absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all duration-200 shadow"
            :class="isToggled ? 'start-[19px]' : 'start-[3px]'" />
    </button>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        checked?: boolean;
        disabled?: boolean;
        color?: string; // e.g. '#00E0BA', 'indigo', etc.
    }>(),
    {
        modelValue: undefined,
        checked: undefined,
        disabled: false,
        color: '#00E0BA'
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'change', value: boolean): void;
}>();

const isToggled = computed(() => {
    if (props.checked !== undefined) {
        return props.checked;
    }
    return !!props.modelValue;
});

const toggle = () => {
    if (props.disabled) return;

    const newValue = !isToggled.value;
    emit('update:modelValue', newValue);
    emit('change', newValue);
};

const colorClass = computed(() => {
    const c = props.color.replace(/['"]/g, '').trim();
    if (c.startsWith('#')) {
        // If it's a hex color, we apply it via inline style (bg-color)
        return '';
    }
    if (c.startsWith('bg-')) {
        return c;
    }
    return `bg-${c}-600`;
});

const inlineStyles = computed(() => {
    const c = props.color.replace(/['"]/g, '').trim();
    const styles: Record<string, string> = {};

    if (isToggled.value) {
        if (c.startsWith('#')) {
            styles['background-color'] = c;
            styles['--tw-ring-color'] = `${c}80`; // 50% opacity
        } else {
            // Default fallback
            styles['--tw-ring-color'] = 'rgba(99, 102, 241, 0.5)';
        }
    } else {
        styles['--tw-ring-color'] = 'rgba(156, 163, 175, 0.5)';
    }

    return styles;
});
</script>