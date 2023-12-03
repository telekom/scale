<template>
  <div>
    <div>{{name}}</div>
    <div>logged {{loggedIn ? "IN" : "OUT"}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    loggedIn: Boolean
  },
};
</script>
