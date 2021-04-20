<template>
  <scale-slider
    :custom-color="customColor"
    :disabled="disabled"
    :label="label"
    :max="max"
    :min="min"
    :show-value="showValue"
    :track-small="trackSmall"
    :thumb-large="thumbLarge"
    :step="step"
    :value="value"
  >
  </scale-slider>
</template>

<script>
export default {
  props: {
    customColor: String,
    disabled: { type: Boolean, default: false },
    label: String,
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    showValue: { type: Boolean, default: true },
    trackSmall: { type: Boolean, default: false },
    thumbLarge: { type: Boolean, default: false },
    step: { type: Number, default: 1 },
    value: Number
  }
};
</script>
