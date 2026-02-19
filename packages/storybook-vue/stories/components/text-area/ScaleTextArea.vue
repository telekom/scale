<template>
  <scale-textarea
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
    :status="status"
    :variant="variant"
    @scale-input="scaleInput"
    @scale-change="scaleChange"
    @scale-focus="scaleFocus"
    @scale-blur="scaleBlur"
    @scale-keydown="scaleKeydown"
  >
    <slot></slot>
  </scale-textarea>
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
    ariaDetailsId: { type: String },
    status: { type: String },
    variant: { type: 'informational' | 'warning' | 'danger' | 'success', default: 'informational'},
  },
  methods: {
    scaleInput($event) {
      action('scale-input')($event.detail);
      this.$emit('scale-input', $event);
    },
    scaleChange($event) {
      action('scale-change')($event.detail);
      this.$emit('scale-change', $event);
    },
    scaleFocus($event) {
      action('scale-focus')($event.detail);
      this.$emit('scale-focus', $event);
    },
    scaleBlur($event) {
      action('scale-blur')($event.detail);
      this.$emit('scale-blur', $event);
    },
    scaleKeydown($event) {
      action('scale-keydown')($event.detail);
      this.$emit('scale-keydown', $event);
    },
  },
};
</script>
