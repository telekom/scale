<template>
  <scale-dropdown
    :name="name"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :disabled="disabled"
    :required="required"
    :size="size"
    :value="value"
    :input-id="inputId"
    :visible-size="visibleSize"
    :controlled="controlled"
    @scaleInput="scaleInput"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
    @scaleKeyDown="scaleKeyDown"
  >
    <slot></slot>
  </scale-dropdown>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    name: { type: String },
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    required: { type: Boolean },
    size: { type: String },
    value: { type: String },
    inputId: { type: String },
    visibleSize: { type: Number },
    controlled: { type: Boolean },
    styles: { type: String },
  },
  methods: {
    scaleInput($event) {
      action('scaleInput');
      this.$emit('scaleInput', $event);
    },
    'scale-input'($event) {
      action('scale-input');
      this.$emit('scale-input', $event);
    },
    scaleChange($event) {
      action('scaleChange');
      this.$emit('scaleChange', $event);
    },
    'scale-change'($event) {
      action('scale-change');
      this.$emit('scale-change', $event);
    },
    scaleFocus($event) {
      action('scaleFocus');
      this.$emit('scaleFocus', $event);
    },
    'scale-focus'($event) {
      action('scale-focus');
      this.$emit('scale-focus', $event);
    },
    scaleBlur($event) {
      action('scaleBlur');
      this.$emit('scaleBlur', $event);
    },
    'scale-blur'($event) {
      action('scale-blur');
      this.$emit('scale-blur', $event);
    },
    scaleKeyDown($event) {
      action('scaleKeyDown');
      this.$emit('scaleKeyDown', $event);
    },
    'scale-keydown'($event) {
      action('scale-keydown');
      this.$emit('scale-keydown', $event);
    },
  },
};
</script>
