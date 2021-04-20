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
    :label="label"
    :helper-text="helperText"
    :status="status"
    :size="size"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
  >
  </scale-date-picker>
</template>

<script>
import { action } from "@storybook/addon-actions";

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
    status: { type: String },
    disabled: { type: Boolean },
    size: { type: String },
  },
  methods: {
    scaleChange($event) {
      action("scaleChange");
      this.$emit("scaleChange", $event);
    },
    scaleFocus($event) {
      action("scaleFocus");
      this.$emit("scaleFocus", $event);
    },
    scaleBlur($event) {
      action("scaleBlur");
      this.$emit("scaleBlur", $event);
    }
  }
};
</script>
