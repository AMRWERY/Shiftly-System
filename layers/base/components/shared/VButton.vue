<template>
  <div :class="$attrs.class">
    <nuxt-link-locale v-if="route && to" :to="to" :class="buttonClasses" :title="title" :type="type"
      v-bind="filteredAttrs">
      <slot></slot>
      <slot name="icon">
        <Icon v-if="defaultIcon" name="heroicons-solid:plus-sm" class="w-5 h-5 ms-2" />
        <Icon v-else-if="appendIcon" :name="appendIcon" class="w-5 h-5 ms-2" />
      </slot>
    </nuxt-link-locale>

    <button v-else :class="buttonClasses" :title="title" :type="type" :disabled="disabled" v-bind="filteredAttrs">
      <slot></slot>
      <slot name="icon">
        <Icon v-if="defaultIcon" name="heroicons-solid:plus-sm" class="ms-2 w-5 h-5" />
        <Icon v-else-if="appendIcon" :name="appendIcon" class="ms-2 w-5 h-5" />
      </slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

/** Forward every attr except class/style to the inner button/link */
const filteredAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs as Record<string, any>
  return rest
})

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultIcon: {
    type: String,
    default: '',
  },
  appendIcon: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: 'base-btn-bg',
  },
  bgHoverColor: {
    type: String,
    default: 'base-btn-bg:hover',
  },
  hoverColor: {
    type: String,
    default: 'hover:bg-[#3b5998]/90',
  },
  borderColor: {
    type: String,
    default: 'border-current',
  },
  textColor: {
    type: String,
    default: 'text-current',
  },
  noBorder: {
    type: Boolean,
    default: false,
  },
  paddingX: {
    type: String,
    default: '',
  },
  paddingY: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'solid',
    validator: (val: string) => ['solid', 'outline', 'ghost'].includes(val),
  },
  link: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
  route: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => {
  const inlineClass = props.inline ? 'inline-flex' : 'flex'

  if (props.link) {
    return [
      'font-medium rounded-lg text-sm text-center',
      props.paddingX, props.paddingY,
      inlineClass,
      'items-center justify-center',
      'text-blue-400 hover:underline',
      props.block ? 'w-full' : '',
      props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]
  }

  const radius =
    props.variant === 'outline' || props.variant === 'ghost' ? 'rounded-lg' : 'rounded-xl'
  const base = [
    `font-medium ${radius} text-sm text-center flex items-center justify-center transition-all`,
    props.paddingX, props.paddingY,
  ]

  const block = props.block ? 'w-full' : ''
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  const variantClass =
    props.variant === 'outline'
      ? [!props.noBorder ? 'border' : '', props.borderColor, props.textColor, 'bg-transparent']
      : props.variant === 'ghost'
        ? ['bg-transparent', props.textColor]
        : ['text-white', props.bgColor, props.bgHoverColor, props.hoverColor]

  return [...base, block, disabledClass, ...variantClass]
})
</script>
