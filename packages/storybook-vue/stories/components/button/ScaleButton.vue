<template>
  <scale-button
    :disabled="disabled"
    :href="href"
    :download="download"
    :target="target"
    :size="size"
    :type="type"
    :name="name"
    :value="value"
    :variant="variant"
    :icon-only="iconOnly"
    :icon-position="iconPosition"
    :inner-tabindex="innerTabindex"
    :inner-aria-label="innerAriaLabel"
    :styles="styles"
    @click="handler"
  >
    <slot></slot>
  </scale-button>
</template>

<script>
import { action } from '@storybook/addon-actions';

const handler = action('click');

export default {
  props: {
    disabled: Boolean,
    href: String,
    download: String,
    type: String,
    name: String,
    value: String,
    target: String,
    variant: String,
    size: String,
    iconOnly: Boolean,
    iconPosition: String,
    innerTabindex: Number,
    innerAriaLabel: String,
    styles: String,
  },
  methods: {
    handler,
  },
};
</script>
