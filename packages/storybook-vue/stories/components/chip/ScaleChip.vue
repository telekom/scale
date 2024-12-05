<template>
  <scale-chip
    :type="type"
    :variant="variant"
    :selected="selected"
    :aria-checked-state="ariaCheckedState"
    :aria-role-title="ariaRoleTitle"
    :disabled="disabled"
    :styles="styles"
    :label="label"
    :dismiss-text="dismissText"
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
    type: { type: 'dynamic' | 'persistent', default: 'persistent' },
    variant: { type: 'standard' | 'outline', default: 'standard' },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    styles: { type: 'switch' | 'radio' | 'option' | 'menuitemreadio' | 'menuitemcheckbox' | 'checkbox', default: 'switch'},
    ariaRoleTitle: { type: String },
    ariaCheckedState: { type: Boolean },
    label: { type: String }, 
    dismissText: { type: String },
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
