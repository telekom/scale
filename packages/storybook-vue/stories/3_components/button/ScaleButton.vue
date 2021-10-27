<template>
  <scale-button
    :title="title"
    :disabled="disabled"
    :href="href"
    :download="download"
    :target="target"
    :size="size"
    :type="type"
    :variant="variant"
    :icon-only="iconOnly"
    :aria-label="ariaLabel"
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
    // TODO `title` is not an actual prop in the component, how should we handle this?
    title: String,
    disabled: Boolean,
    href: String,
    download: String,
    type: String,
    target: String,
    variant: String,
    size: String,
    iconOnly: Boolean,
    ariaLabel: String,
    styles: String,
  },
  methods: {
    handler,
  },
};
</script>
