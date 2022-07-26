<template>
  <scale-segmented-button-group
    :size="size"
    :disabled="disabled"
    :multi-select="multiSelect"
    :styles="styles"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-segmented-button-group>
</template>

<script>
import { action } from "@storybook/addon-actions";
console.log('FOOOOO')
export default {
  props: {
    size: { type: String, default: 'regular' },
    disabled: { type: Boolean, default: false },
    multiSelect: { type: Boolean, default: false },
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