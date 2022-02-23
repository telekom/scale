<template>
  <scale-slider
    :custom-color="customColor"
    :disabled="disabled"
    :name="name"
    :label="label"
    :max="max"
    :min="min"
    :show-value="showValue"
    :track-small="trackSmall"
    :thumb-large="thumbLarge"
    :step="step"
    :value="value"
    @scaleChange="scaleChange"
    @scaleInput="scaleInput"
  >
  </scale-slider>
</template>

<script>
import { action } from "@storybook/addon-actions";
export default {
  props: {
    customColor: String,
    disabled: { type: Boolean, default: false },
    label: String,
    name: String,
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    showValue: { type: Boolean, default: true },
    trackSmall: { type: Boolean, default: false },
    thumbLarge: { type: Boolean, default: false },
    step: { type: Number, default: 1 },
    value: Number
  },
  methods: {
    scaleChange($event) {
      action("scaleChange");
      this.$emit("scaleChange", $event);
    },
    'scale-change'($event) {
      action("scale-change");
      this.$emit("scale-change", $event);
    },
    scaleInput($event) {
      action("scaleInput");
      this.$emit("scaleInput", $event);
    },
    'scale-input'($event) {
      action("scale-input");
      this.$emit("scale-input", $event);
    },
  }
};
</script>
