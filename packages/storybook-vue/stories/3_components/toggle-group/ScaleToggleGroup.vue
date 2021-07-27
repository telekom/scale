<template>
  <scale-toggle-group
    :size="size"
    :variant="variant"
	  :box-type="boxType"
    :disabled="disabled"
    :border="border"
    :multi="multi"
    :aria-label-translation="ariaLabelTranslation"
    :styles="styles"
  >
    <slot></slot>
  </scale-toggle-group>
</template>

<script>
export default {
  props: {
    size: { type: String, default: 'large' },
    variant: { type: String, default: 'primary' },
    boxType: { type: String, default: 'inline' },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    multi: { type: Boolean, default: true },
    ariaLabel: { type: String },
    ariaLabelTranslation: { type: String, default: 'toggle button group with $slottedButtons buttons' },
    styles: { type: String },
  },
};
</script>