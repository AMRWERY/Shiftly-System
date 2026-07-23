<template>
    <input ref="inputRef" type="checkbox" :checked="isChecked" :disabled="disabled" :value="value"
        @change="handleChange" class="w-4 h-4 rounded transition-all focus:ring-offset-0 focus:ring-1" :class="[
            colorClasses,
            borderClasses,
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        ]" :style="inlineStyles" />
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        modelValue?: any;
        checked?: boolean;
        value?: any;
        disabled?: boolean;
        indeterminate?: boolean;
        color?: string; // e.g., 'indigo', 'red', 'blue', etc.
    }>(),
    {
        checked: undefined,
        modelValue: undefined,
        value: undefined,
        disabled: false,
        indeterminate: false,
        color: 'indigo'
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
    (e: 'change', event: Event): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const attrs = useAttrs();

const colorClasses = computed(() => {
    const hasCustomColor = attrs.class && (
        (attrs.class as string).includes('text-') ||
        (attrs.class as string).includes('accent-')
    );
    if (hasCustomColor) {
        return '';
    }

    const c = (props.color || '#00E0BA').replace(/['"]/g, '').trim();
    if (c.startsWith('text-')) {
        return c;
    }
    if (c.startsWith('#')) {
        // Defer to inline styling to avoid missing statically compiled Tailwind classes
        return '';
    }
    return `text-${c}-600 focus:ring-${c}-500/30`;
});

const inlineStyles = computed(() => {
    const c = (props.color || '').replace(/['"]/g, '').trim();
    if (c.startsWith('#')) {
        return {
            color: c,
            '--tw-ring-color': `${c}4D` // Add 30% opacity (4D is ~30% in hex alpha)
        };
    }
    return {};
});

const borderClasses = computed(() => {
    const hasCustomBorder = attrs.class && (attrs.class as string).includes('border-');
    const hasCustomBg = attrs.class && (attrs.class as string).includes('bg-');

    const border = hasCustomBorder ? '' : 'border-gray-700';
    const bg = hasCustomBg ? '' : 'bg-transparent';

    return `${border} ${bg}`.trim();
});

const isChecked = computed(() => {
    if (props.checked !== undefined) {
        return props.checked;
    }
    if (props.modelValue === undefined) {
        return false;
    }
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    }
    if (props.modelValue instanceof Set) {
        return props.modelValue.has(props.value);
    }
    return !!props.modelValue;
});

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const isNowChecked = target.checked;

    emit('change', event);

    if (props.modelValue !== undefined) {
        if (Array.isArray(props.modelValue)) {
            const newValue = [...props.modelValue];
            if (isNowChecked) {
                if (!newValue.includes(props.value)) {
                    newValue.push(props.value);
                }
            } else {
                const index = newValue.indexOf(props.value);
                if (index !== -1) {
                    newValue.splice(index, 1);
                }
            }
            emit('update:modelValue', newValue);
        } else if (props.modelValue instanceof Set) {
            const newValue = new Set(props.modelValue);
            if (isNowChecked) {
                newValue.add(props.value);
            } else {
                newValue.delete(props.value);
            }
            emit('update:modelValue', newValue);
        } else {
            emit('update:modelValue', isNowChecked);
        }
    }
};

const updateIndeterminate = () => {
    if (inputRef.value) {
        inputRef.value.indeterminate = !!props.indeterminate;
    }
};

watch(() => props.indeterminate, updateIndeterminate);

onMounted(() => {
    updateIndeterminate();
});
</script>