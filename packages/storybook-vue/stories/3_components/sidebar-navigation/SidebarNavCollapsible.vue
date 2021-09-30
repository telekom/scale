<script>
export default {
  name: 'SidebarNavCollapsible',
  props: {
    tag: { type: String, default: 'li' },
    label: { type: String },
    href: { type: String, default: '#' },
    expanded: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    bold: { type: Boolean, default: false },
    condensed: { type: Boolean, default: false },
    nestingLevel: { type: Number },
    styles: { type: String }
  }
}
</script>