<script>
export default {
  name: 'scale-sidebar-nav',
  props: {
    ariaLabelSiderbarNav: { type: String },
    collapsible: { type: Boolean, default: false },
    collapsibleMediaQuery: { type: String },
    collapsibleLabel: { type: String, default: 'Menu' },
    styles: { type: String },
    collapsed: { type : Boolean }
  }
}
</script>
