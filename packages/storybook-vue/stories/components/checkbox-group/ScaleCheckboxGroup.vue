<template>
  <scale-checkbox-group
    :name="name"
    :label="label"
    :helper-text="helperText"
    :aria-label-checkbox-group="ariaLabelCheckboxGroup"
    :invalid="invalid"
    :select-text="selectText"
    :unselect-text="unselectText"
    :value="value"
    :input-id="inputId"
    :styles="styles"
    :status="status"
    @scale-change="handler">
    <slot></slot>
  </scale-checkbox-group>
</template>

<script>
import { action } from '@storybook/addon-actions';

const handler = action('scale-change');
export default {
  props: {
    name: { type: String },
    label: { type: String, default: '' },
    helperText: { type: String },
    ariaLabelCheckboxGroup: { type: String, default: 'COMMENT: ariaLabelCheckboxGroup should replace ariaLabel' },
    invalid: { type: Boolean },
    selectText: { type: String, default: 'Select all' },
    unselectText: { type: String, default: 'Unselect all' },
    value: { type: String, default: '' },
    inputId: { type: String },
    styles: { type: String },
    status: { type: String, default: 'COMMENT: DEPRECATED - \'invalid\' should replace status'}
  },
  methods: {
    handler
  }
};
</script>
