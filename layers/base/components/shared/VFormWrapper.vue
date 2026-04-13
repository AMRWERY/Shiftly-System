<template>
  <Form v-slot="formCtx" :validation-schema="validationSchema" :initial-values="initialValues" @submit="onSubmit"
    v-bind="$attrs">
    <slot v-bind="formCtx" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import type { GenericObject } from 'vee-validate'

defineOptions({ inheritAttrs: false })

defineProps<{
  validationSchema?: Record<string, any>
  initialValues?: Record<string, any>
}>()

const emit = defineEmits<{
  submit: [values: GenericObject]
}>()

const onSubmit = (values: GenericObject) => {
  emit('submit', values)
}
</script>