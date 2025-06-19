<script>
export default {
  props: {
    label: { type: String },
    value: { type: Number, default: 0 },
    range: { type: Boolean, default: false },
    valueFrom: { type: Number, default: 0 },
    valueTo: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    showStepMarks: { type: Boolean, default: false },
    unit: { type: String, default: '' },
    unitPosition: { type: 'before' | 'after', default: 'after' },
    decimals: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    showValue: { type: Boolean, default: true },
    name: { type: String },
    sliderId: { type: String },
    helperText: String,
    platform: { type: 'ios' | 'android' },
    styles: { type: String },
    customColor: { type: String },
    trackSmall: { type: Boolean },
    thumbLarge: { type: Boolean },
    innerAriaValueText: { type: '$from to $to'}
  },
  render() {
    return this.$slots.default;
  }
};
</script>
