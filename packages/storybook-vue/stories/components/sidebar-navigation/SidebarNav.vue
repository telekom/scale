<script>
export default {
  name: 'scale-sidebar-nav',
  props: {
    ariaLabel: { type: String },
    collapsible: { type: Boolean, default: false },
    collapsibleMediaQuery: { type: String },
    collapsibleLabel: { type: String, default: 'Menu' },
    styles: { type: String }
  }
}
</script>
