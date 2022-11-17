<template>
  <scale-chip
    :type="type"
    :selected="selected"
    :color="color"
    :href="href"
    :dismissible="dismissible"
    :label="label"
    :target="target"
    :disabled="disabled"
    :styles="styles"
    :icon-size="iconSize"
    @scaleChange="scaleChange"
    @scaleClose="scaleClose"
  >
    <slot name="chip-icon"></slot>
  </scale-chip>
</template>

<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    type: {
      type: 'strong' | 'standard',
      default: 'standard',
    },
    selected: { type: Boolean, default: false },
    color: {
      type:
        'cyan' |
        'yellow' |
        'green' |
        'orange' |
        'red' |
        'violet' |
        'brown' |
        'olive' |
        'teal' |
        'grey',
    },
    href: { type: String, default: '' },
    dismissible: { type: Boolean, default: false },
    label: { type: String },
    target: { type: String, default: '_self' },
    disabled: { type: Boolean, default: false },
    styles: { type: String },
    iconSize: { type: Number, default: 16 },
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
    scaleClose($event) {
      action('scaleClose');
      this.$emit('scaleClose', $event);
    },
    'scale-close'($event) {
      action('scale-close');
      this.$emit('scale-close', $event);
    },
  },
};
</script>
