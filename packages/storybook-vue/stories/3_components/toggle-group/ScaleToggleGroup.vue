<template>
  <scale-toggle-group
    :size="size"
    :variant="variant"
	:box-type="boxType"
    :disabled="disabled"
    :border="border"
    :multi="multi"
    :aria-label="ariaLabel"
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
    styles: { type: String },
  },
};
</script>