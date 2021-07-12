<template>
  <div>
    <scale-loading-spinner
      id="loader"
      :variant="variant"
      :alignment="alignment"
      :text="text"
      :size="size"
      style="padding-left: 25px"
    ></scale-loading-spinner>
    <div
      id="loaded-example-page"
      role="alert"
      style="display: none"
      aria-label=""
    >
      <scale-tag style="padding-left: 30px">Loaded Page</scale-tag>
    </div>
    <div style="padding: 10px"></div>
    <button
      v-on:click="loaded()"
      aria-hidden="true"
      id="loading_button"
      style="
        height: 50px;
        background-color: #cb0068;
        border: 2px solid white;
        border-radius: 12.5px;
        color: white;
        font-weight: bold;
      "
    >
      simulate loading finished
    </button>
    <button
      v-on:click="back()"
      aria-hidden="true"
      id="reloading_button"
      style="
        height: 50px;
        display: none;
        background-color: #cb0068;
        border: 2px solid white;
        border-radius: 25px;
        color: white;
        border-radius: 12.5px;
        font-weight: bold;
      "
    >
      back to loading spinner
    </button>
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
      document.getElementById('reloading_button').style.display = 'block';
      document.getElementById('loading_button').style.display = 'none';
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
      document.getElementById('reloading_button').style.display = 'none';
      document.getElementById('loading_button').style.display = 'block';
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
