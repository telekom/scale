<template>
  <div class="container">
    <div>
      <logo />
      <nuxt-link to="/">Test page 1</nuxt-link>
      <nuxt-link to="/test">Test page 2</nuxt-link>

      <h1 class="title">
        boilerplate-nuxt
      </h1>
      <h2 class="subtitle">
        My legendary Nuxt.js project
      </h2>

      <scale-text-field
        label="text field"
        @scaleChange="handleChange"
        placeholder="add message"
      ></scale-text-field>
      <span>The message is:</span>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo
  },
  data: () => ({
    message: '',
  }),
  methods: {
    handleChange: function(event: any) {
      this.message = event.target.value
    }
  }
})
</script>

<style>
@import "@telekom/scale-components-neutral/dist/scale-components/scale-components.css";
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>
