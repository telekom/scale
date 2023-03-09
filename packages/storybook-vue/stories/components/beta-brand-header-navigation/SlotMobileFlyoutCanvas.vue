<template>
  <scale-telekom-mobile-flyout-canvas :app-name="appName" :app-name-link="appNameLink">
    <!-- lang-switcher -->
    <scale-telekom-nav-list variant="lang-switcher" slot="mobile-before-main-nav" alignment="left">
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
      <scale-telekom-mobile-menu-item active>
        <a href="#">Topic One</a>
        <scale-telekom-mobile-menu-item active slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
      </scale-telekom-mobile-menu-item>
      <scale-telekom-mobile-menu-item>
        <a href="#">Topic Two</a>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item slot="children">
          <a href="#">Second Level</a>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
          <scale-telekom-mobile-menu-item slot="children">
            <a href="#">Third Level</a>
          </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
      </scale-telekom-mobile-menu-item>
      <scale-telekom-mobile-menu-item>
        <a href="#">Topic Three</a>
      </scale-telekom-mobile-menu-item>
      <scale-telekom-mobile-menu-item>
        <a href="#">Topic Four</a>
      </scale-telekom-mobile-menu-item>
    </scale-telekom-mobile-menu>

    <!-- meta-nav-external -->
    <scale-telekom-nav-list variant="meta-nav-external" slot="mobile-meta-nav-external" alignment="left" style="--flex-direction: column">
      <scale-telekom-nav-item>
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link size="11"></scale-icon-navigation-external-link>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">
          Metanavigation external
          <scale-icon-navigation-external-link size="11"></scale-icon-navigation-external-link>
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