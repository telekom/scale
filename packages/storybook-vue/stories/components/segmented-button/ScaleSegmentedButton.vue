<template>
  <scale-segmented-button
    :size="size"
    :disabled="disabled"
    :multi-select="multiSelect"
    :invalid="invalid"
    :label="label"
    :helper-text="helperText"
    :full-width="fullWidth"
    :styles="styles"
    :selected-index="selectedIndex"
    :aria-label-translation="ariaLabelTranslation"
    :longest-button-width="longestButtonWidth"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-segmented-button>
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
    fullWidth: { type: Boolean, default: false },
    styles: { type: String },
    selectedIndex: { type: Number },
    ariaLabelTranslation: { type: `segment button with $slottedSegments` },
    longestButtonWidth: { type: String },
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
