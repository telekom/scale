<template>
  <scale-text-field
    :name="name"
    :type="type"
    :input-mode-type="inputModeType"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :variant="variant"
    :max-length="maxLength"
    :min-length="minLength"
    :max="max"
    :min="min"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :counter="counter"
    :size="size"
    :value="value"
    :aria-detailed-id="ariaDetailedId"
    :input-id="inputId"
    :input-autofocus="inputAutofocus"
    :input-autocomplete="inputAutocomplete"
    :experimental-controlled="experimentalControlled"
    :hide-label-visually="hideLabelVisually"
    :status="status"
    :transparent="transparent"
    :step="step"
    :list="list"
    @scaleInput="scaleInput"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
    @scaleKeyDown="scaleKeyDown"
  >
    <slot></slot>
  </scale-text-field>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    name: { type: String },
    type: { type: String },
    inputModeType: { type: String },
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    variant: { type: String },
    maxLength: { type: Number },
    minLength: { type: Number },
    max: { type: Number },
    min: { type: Number },
    placeholder: { type: String },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    required: { type: Boolean },
    counter: { type: Boolean },
    size: { type: String },
    value: { type: String },
    ariaDetailedId: { type: String },
    inputId: { type: String },
    inputAutofocus: { type: Boolean },
    inputAutocomplete: { type: String },
    experimentalControlled: { type: Boolean },
    hideLabelVisually: { type: Boolean, default: false },
    styles: { type: String },
    status: { type: String },
    transparent: { type: Boolean },
    step: { type: String, default: '1' },
    list: { type: String },
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
