<script>
export default {
  name: 'SidebarNavItem',
  props: {
    condensed: { type: Boolean, default: false },
    bold: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    current: { type: [String, null], default: null },
    nestingLevel: { type: Number },
    styles: { type: String }
  }
}
</script>