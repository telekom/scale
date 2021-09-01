<template>
  <scale-toggle-group
    :size="size"
    :variant="variant"
	  :box-type="boxType"
    :disabled="disabled"
    :hide-border="hideBorder"
    :single-select="singleSelect"
    :aria-label-translation="ariaLabelTranslation"
    :styles="styles"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-toggle-group>
</template>

<script>
export default {
  props: {
    size: { type: String, default: 'large' },
    variant: { type: String, default: 'grey-background' },
    boxType: { type: String, default: 'inline' },
    disabled: { type: Boolean, default: false },
    hideBorder: { type: Boolean, default: false },
    singleSelect: { type: Boolean, default: false },
    ariaLabel: { type: String },
    ariaLabelTranslation: { type: String, default: 'toggle button group with $slottedButtons buttons' },
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