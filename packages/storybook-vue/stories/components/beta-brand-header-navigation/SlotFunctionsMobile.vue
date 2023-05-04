<template>
    <scale-telekom-nav-list
      variant="functions"
      slot="functions"
      alignment="right"
      aria-label="Functions Menu"
    >
      <scale-telekom-nav-item aria-label="Menu">
        <button>
          <scale-badge>
            <scale-icon-action-menu></scale-icon-action-menu>
          </scale-badge>
        </button>
        <scale-telekom-nav-flyout variant="mobile">
          <SlotMobileFlyoutCanvas
            :app-name="appName"
            :app-name-link="appNameLink"
          />
        </scale-telekom-nav-flyout>
      </scale-telekom-nav-item>
    </scale-telekom-nav-list>
  </template>
  
  <script>
  import SlotMobileFlyoutCanvas from './SlotMobileFlyoutCanvas.vue';
  
  export default {
    components: { SlotMobileFlyoutCanvas },
    props: {
      appName: String,
      appNameLink: String,
    },
  };
  </script>
  