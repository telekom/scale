<template>
  <div>
    <h1>Vue App</h1>
    <h3>Alert</h3>
    <t-alert variant="success">Success</t-alert>
    <h3>Button</h3>
    <t-button>Click!</t-button>
    <h3>Card</h3>
    <t-card>A tile</t-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app"
});
</script>

<style>
:root {}

html {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  margin: 0;
  padding: 4rem;
}

hr {
  margin: 3rem 0;
}
</style>
