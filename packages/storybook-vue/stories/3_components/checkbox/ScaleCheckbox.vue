<template>
  <scale-checkbox
    :name="name"
    :label="label"
    :helper-text="helperText"
    :disabled="disabled"
    :checked="checked"
    :value="value"
    :status="status"
    :input-id="inputId"
    @scaleChange="scaleChange"
  >
    <slot></slot>
  </scale-checkbox>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    name: { type: String },
    label: { type: String },
    helperText: { type: String },
    disabled: { type: Boolean },
    checked: { type: Boolean },
    value: { type: String },
    status: { type: String },
    inputId: { type: String },
    styles: { type: String }
  },
  methods: {
    scaleChange($event) {
      action("scaleChange");
      this.$emit("scaleChange", $event);
    }
  }
};
</script>
