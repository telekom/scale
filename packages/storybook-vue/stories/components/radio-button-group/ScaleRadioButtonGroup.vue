<script>
export default {
  name: 'Radio Button Group',
  props: {
    helperText: { type: String },
    label: { type: String },
    invalid: { type: Boolean },
    status: { type: String }, 
  },
  render() {
    return this.$slots.default;
  }
};
</script>
