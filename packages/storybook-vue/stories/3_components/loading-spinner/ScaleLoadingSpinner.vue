<template>
  <div>
    <scale-loading-spinner
      id="loader"
      :variant="variant"
      :alignment="alignment"
      :text="text"
      :size="size"
    ></scale-loading-spinner>
    <div
      id="loaded-example-page"
      role="alert"
      style="display: none"
      aria-label=""
    >
      <div>Page</div>
    </div>
    <button v-on:click="loaded()" aria-hidden="true">Load</button>
    <button v-on:click="back()" aria-hidden="true">Back to Spinner</button>
  </div>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  methods: {
    loaded: function () {
      let myVar;
      myVar = setTimeout(this.showPage(), 6000);
      console.log('timeout works');
    },
    showPage: function () {
      console.log('loaded');
      document.getElementById('loader').style.display = 'none';
      document.getElementById('loaded-example-page').style.display = 'block';
      document
        .getElementById('loaded-example-page')
        .setAttribute('aria-label', 'Loading completed for ');
    },
    back: function () {
      let myVar;
      myVar = setTimeout(this.showSpinner(), 6000);
      console.log('timeout works');
    },
    showSpinner: function () {
      console.log('reloaded');
      document.getElementById('loader').style.display = 'block';
      document.getElementById('loaded-example-page').style.display = 'none';
    },
  },
  props: {
    variant: { type: 'white' | 'primary', default: 'primary' },
    alignment: {
      type: 'horizontal' | 'vertical',
      default: 'horizontal',
    },
    text: { type: String },
    size: { type: 'small' | 'large', default: 'small' },
  },
};
</script>
