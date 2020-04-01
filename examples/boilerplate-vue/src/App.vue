<template>
  <div>
    <h1>Vue App</h1>
    <h3>Alert</h3>
    <scale-link variant="success">Success</scale-link>
    <h3>Button</h3>
    <scale-button>Click!</scale-button>
    <h3>Card</h3>
    <scale-card>A tile</scale-card>
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
