<template>
  <scale-search
    :combobox-id="comboboxId"
    :label="label"
    :name="name"
    :helper-text="helperText"
    :disabled="disabled"
    :variant="variant"
    :value="value"
    @scaleChange="['scale-change']"
    @scaleFocus="['scale-focus']"
    @scaleBlur="['scale-blur']"
    @scaleKeyDown="['scale-keydown']"
  >
    <slot></slot>
    <slot name="input"></slot>
  </scale-search>
</template>
<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    comboboxId: { type: String },
    label: { type: String },
    name: { type: String },
    helperText: { type: String },
    disabled: { type: Boolean },
    variant: { type: String },
    value: { type: String },
  },
  methods: {
    'scale-change'($event) {
      action('scale-change');
      this.$emit('scale-change', $event);
    },
    'scale-focus'($event) {
      action('scale-focus');
      this.$emit('scale-focus', $event);
    },
    'scale-blur'($event) {
      action('scale-blur');
      this.$emit('scale-blur', $event);
    },
    'scale-keydown'($event) {
      action('scale-keydown');
      this.$emit('scale-keydown', $event);
    },
  },
};
</script>
