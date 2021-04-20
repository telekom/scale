<template>
  <scale-tag
    :disabled="disabled"
    :dismissable="dismissable"
    :dismiss-text="dismissText"
    :href="href"
    :size="size"
    :target="target"
    :variant="variant"
    @click="click"
    @scaleClose="click"
    :styles="styles"
  >
    <slot></slot>
  </scale-tag>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    disabled: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: false },
    href: String,
    dismissText: String,
    size: String,
    target: { type: String, default: "_self" },
    variant: String,
    styles: String,
  },
  methods: {
    click: function ($event) {
      action("click");
      this.$emit("click", $event);
    },
  },
};
</script>
