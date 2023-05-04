<template>
    <scale-telekom-header>
      <SlotFunctionsMobile/>
    </scale-telekom-header>
  </template>
  
  <script>
  import SlotFunctionsMobile from './SlotFunctionsMobile.vue';
  
  export default {
    components: {
      SlotFunctionsMobile,
    },
    props: {
      appName: String,
    },
  };
  </script>
  