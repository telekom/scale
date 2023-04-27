<template>
  <scale-telekom-nav-list
    variant="functions"
    slot="functions"
    alignment="right"
  >
    <scale-telekom-nav-item>
      <a href="#">
        <scale-badge no-dot label="Search" search>
          <scale-icon-action-search></scale-icon-action-search>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item>
      <a href="#">
        <scale-badge count="1" label="Cart" cart>
          <scale-icon-action-shopping-cart></scale-icon-action-shopping-cart>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item>
      <a href="#">
        <scale-badge no-dot label="Login" user>
          <scale-icon-user-file-user></scale-icon-user-file-user>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item hide-on-desktop>
      <button>
        <scale-badge>
          <scale-icon-action-menu></scale-icon-action-menu>
        </scale-badge>
      </button>
      <scale-telekom-nav-flyout variant="mobile">
        <SlotMobileFlyoutCanvasSlim
          :app-name="appName"
          :app-name-link="appNameLink"
        />
      </scale-telekom-nav-flyout>
    </scale-telekom-nav-item>
  </scale-telekom-nav-list>
</template>

<script>
import SlotMobileFlyoutCanvasSlim from './SlotMobileFlyoutCanvasSlim.vue';

export default {
  components: { SlotMobileFlyoutCanvasSlim },
  props: {
    appName: String,
    appNameLink: String,
  },
};
</script>

<style>
scale-badge::part(label) {
  display: none;
}

@media screen and (min-width: 1040px) {
  scale-badge::part(label) {
    display: flex
  }
}
</style>
