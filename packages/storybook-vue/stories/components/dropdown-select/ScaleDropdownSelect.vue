<template>
  <scale-dropdown-select
    :label="label"
    :helper-text="helperText"
    :variant="variant"
    :invalid="invalid"
    :disabled="disabled"
    :size="size"
    :value="value"
    :combobox-id="comboboxId"
    :hide-label-visually="hideLabelVisually"
    :floating-strategy="floatingStrategy"
    @scaleChange="['scale-change']"
    @scaleFocus="['scale-focus']"
    @scaleBlur="['scale-blur']"
    @scaleKeyDown="['scale-keydown']"
  >
    <slot></slot>
  </scale-dropdown-select>
</template>

<script>
export default {
  props: {
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    size: { type: String },
    value: { type: String },
    variant: { type: String },
    comboboxId: { type: String },
    hideLabelVisually: {type: Boolean, default: false},
    floatingStrategy: { type: String }
  },
  render() {
    return this.$slots.default;
  }
};
</script>
