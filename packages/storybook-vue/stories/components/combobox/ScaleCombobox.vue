<template>
  <scale-combobox
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :invalid="invalid"
    :allow-custom="allowCustom"
    :helper-text="helperText"
    :value="value"
    :options.prop="options"
    :filter-function.prop="filterFunction"
    @scaleChange="handleChange"
  >
  </scale-combobox>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    allowCustom: {
      type: Boolean,
      default: true,
    },
    helperText: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    filterFunction: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleChange(event) {
      // Extract the event details to avoid Vue reactivity issues
      this.$emit('scaleChange', {
        detail: event.detail,
      });
    },
  },
};
</script>
