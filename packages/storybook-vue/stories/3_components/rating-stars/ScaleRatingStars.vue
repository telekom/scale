<template>
  <scale-rating-stars
    :max-rating="maxRating"
    :max="max"
    :min-rating="minRating"
    :rating="rating"
    :star-size="starSize"
    :size="size"
    :disabled="disabled"
    :aria-label-translation="ariaLabelTranslation"
    :label="label"
    :readonly="readonly"
    @scaleChange="scaleChange"
  >
  </scale-rating-stars>
</template>

<script>
export default {
  props: {
    maxRating: { type: Number, default: 5 },
    max: { type: Number, default: 5 },
    minRating: { type: Number, default: 0 },
    rating: { type: Number, default: 3 },
    starSize: { type: String, default: 'large' },
    size: { type: String, default: 'large' },
    disabled: { type: Boolean, default: false },
    ariaLabelTranslation: { type: String },
    label: { type: String },
    readonly: { type: Boolean, default: false },
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
  }
};
</script>
