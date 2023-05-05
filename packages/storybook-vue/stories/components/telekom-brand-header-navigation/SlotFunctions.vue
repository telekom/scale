<template>
  <scale-telekom-nav-list
    variant="functions"
    slot="functions"
    alignment="right"
    aria-label="Functions Menu"
  >
    <scale-telekom-nav-item aria-label="Search">
      <a href="#">
        <scale-badge no-dot label="Search">
          <scale-icon-action-search></scale-icon-action-search>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item aria-label="Cart">
      <a href="#">
        <scale-badge count="1" label="Cart" aria-label-translation="$label - $count item in shopping cart">
          <scale-icon-action-shopping-cart></scale-icon-action-shopping-cart>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item aria-label="Login">
      <a href="#">
        <scale-badge no-dot label="Login">
          <scale-icon-user-file-user></scale-icon-user-file-user>
        </scale-badge>
      </a>
    </scale-telekom-nav-item>
    <scale-telekom-nav-item hide-on-desktop aria-label="Menu">
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

<style>
scale-badge::part(label) {
  display: none;
}

@media screen and (min-width: 1040px) {
  scale-badge::part(label) {
    display: flex;
  }
}
</style>
