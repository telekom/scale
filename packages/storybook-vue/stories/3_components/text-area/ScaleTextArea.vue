<template>
  <scale-input
    :name="name"
    :label="label"
    :rows="rows"
    :cols="cols"
    :helper-text="helperText"
    :status="status"
    :max-length="maxLength"
    :min-length="minLength"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :counter="counter"
    :resize="resize"
    :value="value"
    :input-id="inputId"
    :transparent="transparent"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
    @scaleKeyDown="scaleKeyDown"
  >
    <slot></slot>
  </scale-input>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    name: { type: String },
    label: { type: String },
    rows: { type: Number },
    cols: { type: Number },
    helperText: { type: String },
    status: { type: String },
    maxLength: { type: Number },
    minLength: { type: Number },
    placeholder: { type: String },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    required: { type: Boolean },
    counter: { type: Boolean },
    resize: { type: String },
    value: { type: String },
    inputId: { type: String },
    transparent: { type: Boolean },
    styles: { type: String }
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
    },
    scaleKeyDown($event) {
      action("scaleKeyDown");
      this.$emit("scaleKeyDown", $event);
    }
  }
};
</script>
