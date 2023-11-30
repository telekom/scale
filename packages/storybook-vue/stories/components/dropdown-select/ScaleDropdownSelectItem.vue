<template>
  <scale-dropdown-select-item
    :value="value"
    :disabled="disabled"
    :selected="selected"
    :focused="focused"
  >
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="suffix"></slot>
  </scale-dropdown-select-item>
</template>

<script>
export default {
  name: 'Dropdown Select Item',
  props: {
    value: { type: String },
    disabled: { type: Boolean },
    selected: { type: Boolean },
    focused: { type: Boolean },
  },
};
</script>
