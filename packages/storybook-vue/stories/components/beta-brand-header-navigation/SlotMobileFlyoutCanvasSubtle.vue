<template>
  <scale-telekom-mobile-flyout-canvas
    :app-name="appName"
    :app-name-link="appNameLink"
  >
    <!-- lang-switcher -->
    <scale-telekom-nav-list
      variant="lang-switcher"
      slot="mobile-before-main-nav"
      alignment="left"
    >
      <scale-telekom-nav-item active>
        <a href="#">EN</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">SO</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">DE</a>
      </scale-telekom-nav-item>
    </scale-telekom-nav-list>

    <!-- main-nav -->
    <scale-telekom-mobile-menu slot="mobile-main-nav">
    </scale-telekom-mobile-menu>

    <!-- meta-nav-external -->
    <scale-telekom-nav-list
      variant="meta-nav-external"
      slot="mobile-meta-nav-external"
      alignment="left"
      style="--flex-direction: column"
    >
      <scale-telekom-nav-item>
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link
            size="11"
          ></scale-icon-navigation-external-link>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link
            size="11"
          ></scale-icon-navigation-external-link>
        </a>
      </scale-telekom-nav-item>
      <!-- </scale-telekom-nav-list>
    <scale-telekom-nav-list variant="meta-nav" slot="mobile-meta-nav" alignment="left" style="--flex-direction: column"> -->
      <scale-telekom-nav-item>
        <a href="#">Metanavigation internal</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">Metanavigation internal</a>
      </scale-telekom-nav-item>
    </scale-telekom-nav-list>
  </scale-telekom-mobile-flyout-canvas>
</template>

<script>
export default {
  props: {
    appName: String,
    appNameLink: String,
  },
};
</script>
