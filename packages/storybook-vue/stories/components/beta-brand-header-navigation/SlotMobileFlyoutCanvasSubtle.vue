<template>
  <scale-telekom-mobile-flyout-canvas
    :app-name="appName"
    :app-name-link="appNameLink"
    type="subtle"
  >
    <!-- lang-switcher -->
    <scale-telekom-nav-list
      variant="lang-switcher"
      slot="mobile-before-main-nav"
      alignment="left"
      aria-label="Language switcher"
    >
      <scale-telekom-nav-item active aria-label="English">
        <a href="#">EN</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="Somali">
        <a href="#">SO</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="German">
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
      aria-label="Metanavigation"
    >
      <scale-telekom-nav-item aria-label="External link">
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link
            size="11"
          ></scale-icon-navigation-external-link>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="Second external link">
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link
            size="11"
          ></scale-icon-navigation-external-link>
        </a>
      </scale-telekom-nav-item>
      <!-- </scale-telekom-nav-list>
    <scale-telekom-nav-list variant="meta-nav" slot="mobile-meta-nav" alignment="left" style="--flex-direction: column"> -->
      <scale-telekom-nav-item aria-label="Internal link">
        <a href="#">Metanavigation internal</a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="Second internal link">
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
