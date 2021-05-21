<template>
  <scale-radio-button-group>
    :helperText="helperText" :label="label"
    <slot></slot>
  </scale-radio-button-group>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    helperText: { type: String, default: '' },
    label: { type: String, default: '' },
  },
  methods: {},
};
</script>
