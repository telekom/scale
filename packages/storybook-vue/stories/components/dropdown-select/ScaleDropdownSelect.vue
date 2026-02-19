<template>
  <scale-dropdown-select
    :label="label"
    :helper-text="helperText"
    :variant="variant"
    :invalid="invalid"
    :disabled="disabled"
    :size="size"
    :value="value"
    :combobox-id="comboboxId"
    :hide-label-visually="hideLabelVisually"
    :floating-strategy="floatingStrategy"
    :read-only="readOnly"
    :transparent="transparent"
    :aria-label-selected="ariaLabelSelected"
    :hcm-label-disabled="hcmLabelDisabled"
    :allow-clear="allowClear"
    @scale-change="scaleChange"
    @scale-focus="scaleFocus"
    @scale-blur="scaleBlur"
    @scale-keydown="scaleKeydown"
  >
    <slot></slot>
  </scale-dropdown-select>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  name: 'Dropdown Select',
  props: {
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    size: { type: String },
    floatingStrategy: { type: 'absolute' | 'fixed' , default: 'absolute' },
    variant: { type: String },
    comboboxId: { type: String },
    hideLabelVisually: { type: Boolean, default: false },
    floatingStrategy: { type: String },
    ariaDetailsId: { type: String },
    readOnly: { type: Boolean }, 
    transparent: { type: Boolean }, 
    ariaLabelSelected: { type: String },
    hcmLabelDisabled: { type: String },
    value: { type: String},
    allowClear: {type: Boolean}
  },
  methods: {
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
