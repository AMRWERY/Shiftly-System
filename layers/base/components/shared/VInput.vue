<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <label :for="id"
      :class="labelClass || ['block mb-1 text-sm font-medium', errorMessage ? 'text-red-300' : 'text-gray-200']">
      {{ label }}
      <span v-if="required" class="text-red-300">*</span>
    </label>

    <div class="relative w-full">
      <!-- prefix-icon -->
      <span v-if="prefixIcon"
        :class="['absolute inset-y-0 flex items-center text-gray-400 start-3 hover:text-white transition-colors', errorMessage ? 'text-red-300' : 'text-gray-400']">
        <Icon :name="prefixIcon" class="w-5 h-5" />
      </span>
      <!-- input -->
      <template v-if="type === 'textarea'">
        <Field as="textarea" :name="name" :placeholder="placeholder" :id="id" :readonly="readonly" :options="options"
          v-model="internalValue" :rules="rules" v-slot="{ errorMessage: fieldError }" rows="4">
          <textarea :name="name" :placeholder="placeholder" :id="id" :readonly="readonly" v-model="internalValue"
            :class="[
              'w-full bg-[#13192a] border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm placeholder:text-slate-600 text-white',
              prefixIcon ? 'ps-11' : 'ps-4',
              fieldError ? 'border-red-500/50' : 'border-white/5'
            ]" rows="4" />
        </Field>
      </template>

      <template v-else-if="type === 'select'">
        <Field as="select" :name="name" :placeholder="placeholder" :id="id" :readonly="readonly" v-model="internalValue"
          :rules="rules" :class="[
            'w-full bg-[#13192a] border rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm text-white',
            prefixIcon ? 'ps-11 pe-4' : 'px-4',
            'border-white/5'
          ]">
          <option value="" disabled selected class="text-slate-600">{{ placeholder }}</option>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </Field>
      </template>

      <template v-else>
        <Field :type="showPassword ? 'text' : type" :name="name" :placeholder="placeholder" :id="id" :options="options"
          :readonly="readonly" v-model="internalValue" :rules="rules" v-slot="{ errorMessage: fieldError }">
          <input :type="showPassword ? 'text' : type" :name="name" :placeholder="placeholder" :id="id"
            :readonly="readonly" v-model="internalValue" :class="[
              'w-full bg-[#13192a] border rounded-lg py-3 pe-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm placeholder:text-slate-600 text-white',
              prefixIcon ? 'ps-11' : 'ps-4',
              fieldError ? 'border-red-500/50' : 'border-white/5'
            ]" />
        </Field>
      </template>

      <!-- Eye icon -->
      <span v-if="type === 'password'" @click="togglePassword"
        class="absolute inset-y-0 flex items-center text-gray-400 cursor-pointer end-3 hover:text-gray-300">
        <Icon :name="showPassword ? 'material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'"
          class="w-5 h-5" />
      </span>
    </div>

    <!-- error messages -->
    <ErrorMessage :name="name" class="block mt-1 text-[13px] text-red-300" />
  </div>
</template>

<script lang="ts" setup>
// import { useField } from 'vee-validate';

const { locale } = useI18n();

type SelectOption = { label: string; value: string | number };

const props = defineProps({
  modelValue: {
    type: [String, Number, null, undefined] as PropType<string | number | null | undefined>,
    // required: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  },
  rules: {
    type: [Object, String] as PropType<string | Record<string, any>>,
    default: () => { },
  },
  required: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: null
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  labelClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: string | number | null | undefined) => emit('update:modelValue', value)
});

// Get error message from VeeValidate field context
const { errorMessage } = useField(() => props.name, undefined, {
  syncVModel: false
});

// Password visibility toggle
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>