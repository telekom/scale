<script>
export default {
  props: {
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    size: { type: String },
    value: { type: String },
    variant: { type: String },
    comboboxId: { type: String },
  },
  render() {
    return this.$slots.default;
  }
};
</script>
