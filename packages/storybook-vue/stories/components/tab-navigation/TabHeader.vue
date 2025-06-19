<script>
export default {
  name: 'Tab Header',
  props: {
    styles: { type: String },
    disabled: { type: Boolean, default: 'false' },
    selected: { type: Boolean, default: 'false' },
    size: { type: ['large', 'small'], default: 'small' },
  },
};
</script>
