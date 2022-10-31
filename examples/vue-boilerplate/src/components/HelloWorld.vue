<template>
  <div class="hello">
    <h1 class="scl-font-variant-heading-1">{{ msg }}</h1>
    <scale-button
      href="https://telekom.github.io/scale/?path=/story/scale-for-developers-scale-and-angular--page"
      title="External link"
    >
      Open the docs
    </scale-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
}

h1 {
  margin-top: 0;
}
</style>
