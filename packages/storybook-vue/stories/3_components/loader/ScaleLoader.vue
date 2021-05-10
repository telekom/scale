<template>
  <scale-loader
    :variant="variant"
    :alignment="alignment"
    :text="text"
    :size="size"
  >
  </scale-loader>
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
    size: { type: 'small' | 'large', default: 'small' },
  },
};
</script>
