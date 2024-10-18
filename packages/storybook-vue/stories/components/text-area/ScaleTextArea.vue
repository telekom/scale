<template>
  <scale-input
    :name="name"
    :label="label"
    :rows="rows"
    :cols="cols"
    :helper-text="helperText"
    :invalid="invalid"
    :max-length="maxLength"
    :min-length="minLength"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :counter="counter"
    :resize="resize"
    :value="value"
    :input-id="inputId"
    :transparent="transparent"
    :input-autofocus="inputAutofocus"
    :aria-details-id="ariaDetailsId"
    @scaleInput="scaleInput"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
    @scaleKeyDown="scaleKeyDown"
  >
    <slot></slot>
  </scale-input>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    name: { type: String },
    label: { type: String },
    rows: { type: Number },
    cols: { type: Number },
    helperText: { type: String },
    invalid: { type: Boolean },
    maxLength: { type: Number },
    minLength: { type: Number },
    placeholder: { type: String },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    required: { type: Boolean },
    counter: { type: Boolean },
    resize: { type: String },
    value: { type: String },
    inputId: { type: String },
    transparent: { type: Boolean },
    inputAutofocus: { type: Boolean },
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
