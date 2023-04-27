<template>
  <scale-telekom-nav-list variant="functions" slot="functions" alignment="right" aria-label="Functions Menu">
    <scale-telekom-nav-item class="burger-item" aria-label="Menu">
      <button>
        <scale-badge>
          <scale-icon-action-menu></scale-icon-action-menu>
        </scale-badge>
      </button>
      <scale-telekom-nav-flyout variant="mobile">
        <SlotMobileFlyoutCanvasSubtle :app-name="appName" :app-name-link="appNameLink" />
      </scale-telekom-nav-flyout>
    </scale-telekom-nav-item>
  </scale-telekom-nav-list>
</template>

<script>
import SlotMobileFlyoutCanvasSubtle from './SlotMobileFlyoutCanvasSubtle.vue';

export default {
  components: { SlotMobileFlyoutCanvasSubtle },
  props: {
    appName: String,
    appNameLink: String,
  }
};
</script>

<style>
@media screen and (min-width: 1040px) {
  .burger-item {
    display: none;
  }
}
</style>