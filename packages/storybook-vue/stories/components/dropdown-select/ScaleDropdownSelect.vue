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
    @scaleChange="['scale-change']"
    @scaleFocus="['scale-focus']"
    @scaleBlur="['scale-blur']"
    @scaleKeyDown="['scale-keydown']"
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
    value: { type: String },
    variant: { type: String },
    comboboxId: { type: String },
    hideLabelVisually: { type: Boolean, default: false },
    floatingStrategy: { type: String },
    ariaDetailsId: { type: String },
    readOnly: { type: Boolean }, 
    transparent: { type: Boolean }, 
    ariaLabelSelected: { type: String },
    hcmLabelDisabled: { type: String },
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
