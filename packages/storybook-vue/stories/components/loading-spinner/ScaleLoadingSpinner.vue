<template>
  <scale-loading-spinner
    :variant="variant"
    :alignment="alignment"
    :accessibility-title="accessibilityTitle"
    :text="text"
    :size="size"
  >
  </scale-loading-spinner>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    variant: { type: 'white' | 'primary', default: 'primary' },
    alignment: {
      type: 'horizontal' | 'vertical',
      default: 'horizontal',
    },
    text: { type: String },
    accessibilityTitle: { type: String },
    size: { type: 'small' | 'large', default: 'small' },
  },
};
</script>
