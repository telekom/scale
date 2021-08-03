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
    <div id="loaded-example-page" role="alert" style="display: none">
      <button
        aria-hidden="true"
        style="
          width: 145px;
          height: 53px;
          padding-top: 8px;
          background-color: Transparent;
          background-repeat: no-repeat;
          border: none;

          overflow: hidden;
          outline: none;
        "
      >
        &nbsp;&nbsp;Loaded Page &nbsp;&nbsp;
      </button>
    </div>
    <div style="padding: 10px"></div>
    <scale-button
      v-on:click="loaded()"
      aria-disabled="true"
      id="loading_button"
      style="display: block; width: 170px"
    >
      simulate loading finished
    </scale-button>
    <scale-button
      v-on:click="back()"
      aria-disabled="true"
      id="reloading_button"
      style="display: none; width: 170px"
    >
      back to <br />loading spinner
    </scale-button>
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
        .setAttribute('aria-label', 'Loading completed');
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
