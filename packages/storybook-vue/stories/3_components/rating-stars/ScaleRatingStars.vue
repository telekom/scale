<template>
  <scale-rating-stars
    :num-of-stars="numOfStars"
    :rating="rating"
    :small="small"
    :disabled="disabled"
    :aria-translation="ariaTranslation"
    :label="label"
  >
  </scale-rating-stars>
</template>

<script>
export default {
  props: {
    numOfStars: { type: Number, default: 5 },
    rating: { type: Number, default: 3 },
    small: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    ariaTranslation: { type: String },
    label: { type: String },
  },
};
</script>
