<template>
  <scale-button
    :disabled="disabled"
    :href="href"
    :download="download"
    :target="target"
    :size="size"
    :type="type"
    :variant="variant"
    :icon-only="iconOnly"
    :styles="styles"
    @click="handler"
  >
    <slot></slot>
  </scale-button>
</template>

<script>
import { action } from "@storybook/addon-actions";

const handler = action("click");

export default {
  props: {
    disabled: Boolean,
    href: String,
    download: String,
    type: String,
    target: String,
    variant: String,
    size: String,
    iconOnly: Boolean,
    styles: String,
  },
  methods: {
    handler,
  },
};
</script>
