<template>
  <scale-toggle-group
    :size="size"
    :background="background"
	  :full-width="fullWidth"
    :disabled="disabled"
    :hide-border="hideBorder"
    :single-select="singleSelect"
    :aria-label-translation="ariaLabelTranslation"
    :variant="variant"
    :styles="styles"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-toggle-group>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    size: { type: String, default: 'regular' },
    background: { type: String, default: 'white' },
    fullWidth: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hideBorder: { type: Boolean, default: false },
    singleSelect: { type: Boolean, default: false },
    ariaLabelTranslation: { type: String, default: 'toggle button group with $slottedButtons buttons' },
    variant: { type: String, default: 'color' },
    styles: { type: String },
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