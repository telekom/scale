<template>
  <scale-radio-button-group>
    <slot></slot>
  </scale-radio-button-group>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    helperText: { type: String },
    label: { type: String },
    status: { type: String },
  },
  methods: {},
};
</script>
