<script>
export default {
  name: 'Radio Button',
  props: {
    invalid: { type: Boolean },
    name: { type: String },
    label: { type: String },
    helperText: { type: String },
    disabled: { type: Boolean },
    checked: { type: Boolean },
    value: { type: String },
    inputId: { type: String },
    styles: { type: String }
  },
  methods: {
    fireEvents() {
      this.$emit('scale-change');
    }
  },
  render() {
    return this.$slots.default;
  }
};
</script>
