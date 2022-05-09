<template>
  <div>
    <!-- this has the slots show up in ArgsTable -->
    <slot></slot>
  </div>
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
    styles: { type: String },
  },
};
</script>
‚
