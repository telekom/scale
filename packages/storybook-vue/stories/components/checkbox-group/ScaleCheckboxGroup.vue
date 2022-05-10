<template>
  <scale-checkbox-group>
    <!-- this has the slots show up in ArgsTable -->
    <slot></slot>
  </scale-checkbox-group>
</template>

<script>
export default {
  props: {
    name: { type: String },
    label: { type: String, default: '' },
    helperText: { type: String },
    ariaLabelCheckboxGroup: { type: String },
    invalid: { type: Boolean },
    selectText: { type: String, default: 'Select all' },
    unselectText: { type: String, default: 'Unselect all' },
    value: { type: String, default: '' },
    inputId: { type: String },
  },
};
</script>
‚
