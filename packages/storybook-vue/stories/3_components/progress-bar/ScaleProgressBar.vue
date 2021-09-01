<template>
  <scale-progress-bar
    :custom-color="customColor"
    :disabled="disabled"
    :label="label"
    :has-error="hasError"
    :status-inside="statusInside"
    :status-description="statusDescription"
    :show-status="showStatus"
    :stroke-width="strokeWidth"
    :percentage="percentage"
    :message="message"
    :styles="styles"
  >
    <scale-icon-action-success v-if="statusDescription === 'Upload complete'" slot="icon" decorative size="16"></scale-icon-action-success>
    <scale-icon-action-circle-close v-if="statusDescription === 'Upload fail'" color="#d82a48" slot="icon" decorative size="16"></scale-icon-action-circle-close>
  </scale-progress-bar>
</template>

<script>
export default {
  props: {
    customColor: String,
    disabled: { type: Boolean, default: false },
    label: String,
    statusInside: Boolean,
    hasError: Boolean,
    statusDescription: String,
    styles: String,
    showStatus: Boolean,
    strokeWidth: Number,
    percentage: Number,
    message: String,
  },
};
</script>
