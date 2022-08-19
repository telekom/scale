<script>
export default {
  props: {
    variant: { type: String, default: '' },
    rotation: { type: Number, default: 0 },
    top: { type: String },
    right: { type: String },
    bottom: { type: String },
    left: { type: String },
    styles: { type: String }
  },
  render() {
    return this.$slots.default
  }
}
</script>