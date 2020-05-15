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
      <div class="links">
        <scale-button href="https://nuxtjs.org/" target="_blank">
          Documentation
        </scale-button>
        <scale-button href="https://github.com/nuxt/nuxt.js" target="_blank">
          GitHub
        </scale-button>
      </div>

      <scale-button @click="toggleModal">
        Open modal
      </scale-button>

      <scale-modal id="modal-with-header-and-buttons" :opened.prop="isOpen" @scaleClose="toggleModal">
        <span slot="header">Header</span> content of the modal with header and
        buttons
        <span slot="close">Close</span>
        <span slot="modal-actions">
          <scale-button id="cancel-btn" @click="toggleModal">cancel</scale-button>

          <scale-button id="submit-btn" @click="toggleModal">submit</scale-button>
        </span>
      </scale-modal>
      <scale-input
        @scaleChange="handleChange"
        placeholder="add message"
        :styles="JSON.stringify(styles)"
        :styles.prop="styles"
      ></scale-input>
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
    Logo,
  },
  data: () => ({
    message: '',
    styles: { input: { '& input': { background: 'green' } } },
    isOpen: false,
  }),
  methods: {
    handleChange: function (event: any) {
      this.message = event.target.value
    },
    toggleModal: function () {
      this.isOpen = !this.isOpen
    },
  },
})
</script>

<style>
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

.links {
  padding-top: 15px;
}
</style>
