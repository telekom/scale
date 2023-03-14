<template>
  <scale-telekom-nav-list
    variant="functions"
    slot="functions"
    alignment="right"
  >
    <scale-telekom-nav-item search>
      <a href="#">
        <scale-badge no-dot label="Search">
          <scale-icon-action-search></scale-icon-action-search>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item cc>
      <a href="#">
        <scale-badge no-dot label="Payment" label-visually-hidden>
          <scale-icon-content-credit-card></scale-icon-content-credit-card>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item cart>
      <a href="#">
        <scale-badge count="1" label="Cart">
          <scale-icon-action-shopping-cart></scale-icon-action-shopping-cart>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item user>
      <a href="#">
        <scale-badge no-dot label="Login">
          <scale-icon-user-file-user></scale-icon-user-file-user>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item class="burger-item">
      <button>
        <scale-badge>
          <scale-icon-action-menu></scale-icon-action-menu>
        </scale-badge>
      </button>
      <scale-telekom-nav-flyout class="mobile-nav-flyout">
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

<style>
.mobile-nav-flyout {
  --duration: 0;
  --top: 0;
  --height: 100vh;
  --background: var(--telekom-color-background-canvas);
}

[search],
[cart],
[user] {
  display: none;
}

@media screen and (min-width: 1040px) {
  .burger-item {
    display: none;
  }
}

@media screen and (min-width: 1040px) {
  [search],
  [cart],
  [user] {
    display: block;
  }
  [cc] {
    display: none;
  }
}
</style>
