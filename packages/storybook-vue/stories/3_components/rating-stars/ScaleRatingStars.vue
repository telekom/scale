<template>
  <scale-rating-stars
    :max-rating="maxRating"
    :min-rating="minRating"
    :rating="rating"
    :star-size="starSize"
    :disabled="disabled"
    :aria-label-translation="ariaLabelTranslation"
    :label="label"
  >
  </scale-rating-stars>
</template>

<script>
export default {
  props: {
    maxRating: { type: Number, default: 5 },
    minRating: { type: Number, default: 0 },
    rating: { type: Number, default: 3 },
    starSize: { type: String, default: 'large' },
    disabled: { type: Boolean, default: false },
    ariaLabelTranslation: { type: String },
    label: { type: String },
  },
};
</script>
