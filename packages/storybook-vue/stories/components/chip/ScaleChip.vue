<template>
  <scale-chip
    :type="type"
    :selected="selected"
    :dismissible="dismissible"
    :aria-checked-state="ariaCheckedState"
    :aria-role-title="ariaRoleTitle"
    :disabled="disabled"
    :styles="styles"
    @scaleChange="scaleChange"
    @scaleClose="scaleClose"
  >
    <slot name="chip-icon"></slot>
    <slot />
  </scale-chip>
</template>

<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    type: { type: 'standard' | 'outline', default: 'standard' },
    selected: { type: Boolean, default: false },
    dismissible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    styles: { type: String },
    ariaRoleTitle: { type: String, default: 'switch' },
    ariaCheckedState: { type: Boolean },
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
