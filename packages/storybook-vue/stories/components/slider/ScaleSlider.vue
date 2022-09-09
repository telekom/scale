<template>
  <scale-slider
    :disabled="disabled"
    :name="name"
    :label="label"
    :max="max"
    :min="min"
    :show-value="showValue"
    :step="step"
    :platform="platform"
    :value-from="valueFrom"
    :value-to="valueTo"
    :visible-step="visibleStep"
    :helper-text="helperText"
    @scaleChange="scaleChange"
    @scaleInput="scaleInput"
  >
  </scale-slider>
</template>

<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    disabled: { type: Boolean, default: false },
    label: String,
    name: String,
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    showValue: { type: Boolean, default: true },
    step: { type: Number, default: 1 },
    valueTo: Number,
    valueFrom: Number,
    visibleStep: Boolean,
    platform: { type: 'web' | 'ios' | 'android', default: 'web' },
    helperText: String,
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
    scaleInput($event) {
      action('scaleInput');
      this.$emit('scaleInput', $event);
    },
    'scale-input'($event) {
      action('scale-input');
      this.$emit('scale-input', $event);
    },
  },
};
</script>
