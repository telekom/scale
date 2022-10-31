<template>
  <scale-switch
    :name="name"
    :label="label"
    :disabled="disabled"
    :input-id="inputId"
    :checked="checked"
    :size="size"
    @scaleChange="scaleChange"
    style="--color-on: blue"
  >
  </scale-switch>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    disabled: { type: Boolean, default: false },
    inputId: { type: String },
    checked: { type: Boolean, default: false },
    label: String,
    size: String,
    name: String,
  },
  methods: {
    scaleChange($event) {
      action('scaleChange');
      this.$emit('scaleChange', $event);
    },
    'scale-change'($event) {
      action('scale-change');
      this.$emit('scale-change', $event);
    },
  },
};
</script>
