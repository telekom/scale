<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: false },
    href: String,
    dismissText: String,
    size: String,
    target: { type: String, default: "_self" },
    variant: String,
    styles: String,
  },
};
</script>
