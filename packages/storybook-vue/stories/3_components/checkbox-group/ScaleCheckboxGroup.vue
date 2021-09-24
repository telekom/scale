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
    ariaLabel: { type: String },
    status: { type: String, default: '' },
    selectText: { type: String, default: 'Select all' },
    unselectText: { type: String, default: 'Unselect all' },
    value: { type: String, default: '' },
    inputId: { type: String },
    styles: { type: String },
  },
};
</script>
‚
