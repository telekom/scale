<template>
  <scale-dropdown
    :name="name"
    :label="label"
    :helper-text="helperText"
    :status="status"
    :disabled="disabled"
    :required="required"
    :size="size"
    :value="value"
    :input-id="inputId"
    :visible-size="visibleSize"
    :controlled="controlled"
    @scaleChange="scaleChange"
    @scaleFocus="scaleFocus"
    @scaleBlur="scaleBlur"
    @scaleKeyDown="scaleKeyDown"
  >
    <slot></slot>
  </scale-dropdown>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    name: { type: String },
    label: { type: String },
    helperText: { type: String },
    status: { type: String },
    disabled: { type: Boolean },
    required: { type: Boolean },
    size: { type: String },
    value: { type: String },
    inputId: { type: String },
    visibleSize: { type: Number },
    controlled: { type: Boolean },
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
