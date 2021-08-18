<template>
  <main>
    <HelloWorld msg="Scale + Vue.js"/>
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
main {
  display: grid;
  place-items: center;
  height: 100vh;
  font-family: sans-serif;
}
</style>
