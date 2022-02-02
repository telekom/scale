<template>
  <scale-grid
    :columns="columns"
    :gutter-x="gutterX"
    :gutter-y="gutterY"
    :spacing="spacing"
    :max-width="maxWidth"
  >
  </scale-grid>
</template>

<script>

export default {
  props: {
    columns: String,
    gutterY: String,
    gutterX: String,
    spacing: String,
    maxWidth: String,
  },
};
</script>
