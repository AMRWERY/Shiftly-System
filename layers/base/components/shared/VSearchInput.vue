<template>
  <div>
    <div class="relative w-full" :class="containerClass">
      <input type="text" :value="modelValue" @input="onInput" @keydown.enter="
        $emit('search', ($event.target as HTMLInputElement).value)
        " :placeholder="placeholder || t('form.search_placeholder')"
        class="w-full px-4 py-2 border border-white/10 rounded-xl pe-10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary/30 transition-all shadow-inner"
        aria-label="Search" />
      <div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
        <Icon name="material-symbols:search" class="w-5 h-5 text-gray-500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps<{
  modelValue: string; // For v-model
  placeholder?: string;
  containerClass?: string | string[] | Record<string, boolean>; // Optional class for the container div
  debounce?: number; // Optional debounce time in ms
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void; // Emitted on enter or after debounce
}>();

const debouncedSearch = useDebounceFn((value: string) => {
  emit("search", value);
}, props.debounce || 0);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);

  if (props.debounce && props.debounce > 0) {
    debouncedSearch(target.value);
  } else {
    emit("search", target.value);
  }
};
</script>