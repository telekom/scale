<template>
  <scale-telekom-nav-list variant="functions" slot="functions" alignment="right">
    <scale-telekom-nav-item>
      <a href="#">
        <scale-icon-action-search></scale-icon-action-search>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item>
      <a href="#">
        <scale-icon-content-credit-card></scale-icon-content-credit-card>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item>
      <a href="#">
        <scale-badge count="1" label="Cart" label-visually-hidden>
          <scale-icon-action-shopping-cart></scale-icon-action-shopping-cart>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item>
      <a href="#">
        <scale-icon-user-file-user></scale-icon-user-file-user>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item class="burger-item">
      <button>
        <scale-badge>
          <scale-icon-action-menu></scale-icon-action-menu>
        </scale-badge>
      </button>
      <scale-telekom-nav-flyout class="mobile-nav-flyout">
        <SlotMobileFlyoutCanvas :app-name="appName" :app-name-link="appNameLink" />
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
  }
};
</script>

<style>
.mobile-nav-flyout {
  --duration: 0;
  --top: 0;
  --height: 100vh;
  --background: var(--telekom-color-background-canvas);
}

@media screen and (min-width: 1040px) {
  .burger-item {
    display: none;
  }
}
</style>