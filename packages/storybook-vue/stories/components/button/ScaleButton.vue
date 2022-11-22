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
    :inner-tabindex="innerTabindex"
    :form="form"
    :aria-label="ariaLabel"
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
    innerTabindex: Number,
    form: String,
    ariaLabel: String,
    styles: String,
  },
  methods: {
    handler,
  },
};
</script>
