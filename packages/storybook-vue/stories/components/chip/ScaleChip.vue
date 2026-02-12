<template>
  <scale-chip
    :type="type"
    :variant="variant"
    :selected="selected"
    :aria-checked-state="ariaCheckedState"
    :aria-role-title="ariaRoleTitle"
    :disabled="disabled"
    :styles="styles"
    :dismiss-text="dismissText"
    @scale-change="scaleChange"
    @scale-close="scaleClose"
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
    dismissText: { type: String },
  },
  methods: {
    scaleChange($event) {
      action('scale-change')($event.detail);
      this.$emit('scale-change', $event);
    },
    scaleClose($event) {
      action('scale-close')($event.detail);
      this.$emit('scale-close', $event);
    },
  },
};
</script>
