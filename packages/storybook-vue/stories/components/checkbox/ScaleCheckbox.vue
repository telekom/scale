<template>
  <scale-checkbox
    :name="name"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :disabled="disabled"
    :checked="checked"
    :indeterminate="indeterminate"
    :value="value"
    :input-id="inputId"
    :required="required"
    :aria-label-checkbox="ariaLabelCheckbox"
    :aria-details-id="ariaDetailsId"
    @scaleChange="scaleChange"
  >
  </scale-checkbox>
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
    checked: { type: Boolean },
    indeterminate: { type: Boolean },
    value: { type: String },
    inputId: { type: String },
    required: { type: Boolean },
    ariaLabelCheckbox: { type: String },
  },
  methods: {
    scaleChange($event) {
      action('scaleChange');
      this.$emit('scaleChange', $event);
    },
    'scale-change'($event) {
      action('scale-change');
      this.$emit('scale-change', $event);
    },
  },
};
</script>
