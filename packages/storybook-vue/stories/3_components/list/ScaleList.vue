<script>
export default {
  props: {
    ordered: { type: Boolean },
    styles: { type: String }
  },
  render() {
    return this.$slots.default
  }
}
</script>
