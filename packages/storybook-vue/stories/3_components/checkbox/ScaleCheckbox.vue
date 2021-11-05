<script>
export default {
  props: {
    name: { type: String },
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    checked: { type: Boolean },
    indeterminate: { type: Boolean },
    value: { type: String },
    inputId: { type: String }
  }
};
</script>
