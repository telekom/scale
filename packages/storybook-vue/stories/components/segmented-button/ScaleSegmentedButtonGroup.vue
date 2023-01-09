<template>
  <scale-segmented-button-group
    :size="size"
    :disabled="disabled"
    :multi-select="multiSelect"
    :invalid="invalid"
    :label="label"
    :helper-text="helperText"
    :styles="styles"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-segmented-button-group>
</template>

<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    size: { type: String, default: 'small' },
    disabled: { type: Boolean, default: false },
    multiSelect: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    label: { type: String },
    helperText: { type: String },
    styles: { type: String },
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