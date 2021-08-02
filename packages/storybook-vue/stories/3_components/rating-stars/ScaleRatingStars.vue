<template>
  <scale-rating-stars
    :max="max"
    :value="value"
    :small="small"
    :disabled="disabled"
    :aria-label-translation="ariaLabelTranslation"
    :label="label"
  >
  </scale-rating-stars>
</template>

<script>
export default {
  props: {
    max: { type: Number, default: 5 },
    value: { type: Number, default: 3 },
    small: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    ariaLabelTranslation: { type: String },
    label: { type: String },
  },
};
</script>
