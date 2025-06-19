<template>
  <scale-date-picker
    :name="name"
    :identifier="identifier"
    :role="role"
    :direction="direction"
    :required="required"
    :min="min"
    :max="max"
    :first-day-of-week="firstDayOfWeek"
    :localization="localization"
    :date-adapter="dateAdapter"
    :value="value"
    :disabled="disabled"
    :size="size"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :popup-title="popupTitle"
    :placeholder="placeholder"
    :styles="styles"
    :inner-role="innerRole"
    :status="status"
    :variant="variant"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
  >
  </scale-date-picker>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    name: { type: String },
    identifier: { type: String },
    role: { type: String },
    direction: { type: String },
    required: { type: Boolean },
    min: { type: String },
    max: { type: String },
    firstDayOfWeek: { type: String },
    localization: { type: Object },
    dateAdapter: { type: Object },
    value: { type: String },
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    popupTitle: { type: String },
    styles: { type: String },
    placeholder: { type: String },
    size: { type: String },
    ariaDetailsId: { type: String },
    innerRole: { type: String },
    status: { type: String },
    variant: { type: 'informational' | 'warning' | 'danger' | 'success' | 'informational'},
  },
  methods: {
    scaleChange($event) {
      action('scaleChange');
      this.$emit('scaleChange', $event);
    },
    'scale-change'($event) {
      action('scale-change');
      this.$emit('scale-change', $event);
    },
    scaleFocus($event) {
      action('scaleFocus');
      this.$emit('scaleFocus', $event);
    },
    'scale-focus'($event) {
      action('scale-focus');
      this.$emit('scale-focus', $event);
    },
    scaleBlur($event) {
      action('scaleBlur');
      this.$emit('scaleBlur', $event);
    },
    'scale-blur'($event) {
      action('scale-blur');
      this.$emit('scale-blur', $event);
    },
  },
};
</script>
