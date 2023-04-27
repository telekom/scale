<template>
    <scale-telekom-nav-list variant="functions" slot="functions" alignment="right" aria-label="Mobile Navigation">
      <scale-telekom-nav-item aria-label="Search">
        <a href="#">
          <scale-icon-action-search></scale-icon-action-search>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item>
        <a href="#">
          <scale-icon-content-credit-card></scale-icon-content-credit-card>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="Shopping cart">
        <a href="#">
          <scale-badge count="1" label="Cart" label-visually-hidden>
            <scale-icon-action-shopping-cart></scale-icon-action-shopping-cart>
          </scale-badge>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item aria-label="User">
        <a href="#">
          <scale-icon-user-file-user></scale-icon-user-file-user>
        </a>
      </scale-telekom-nav-item>
      <scale-telekom-nav-item class="burger-item" aria-label="Menu">
        <button>
          <scale-badge>
            <scale-icon-action-menu></scale-icon-action-menu>
          </scale-badge>
        </button>
      <scale-telekom-nav-flyout variant="mobile">
          <scale-telekom-mobile-flyout-canvas :app-name="appName" :app-name-link="appNameLink">
      <!-- lang-switcher -->
      <scale-telekom-nav-list variant="lang-switcher" slot="mobile-before-main-nav" alignment="left" aria-label="Language switcher">
        <scale-telekom-nav-item active aria-label="Switch to English">
          <a href="#" title="English">EN</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item aria-label="Switch to German">
          <a href="#" title="German">DE</a>
        </scale-telekom-nav-item>
        <scale-telekom-nav-item aria-label="Switch to Hungarian">
          <a href="#" title="Hungarian">HU</a>
        </scale-telekom-nav-item>    
      </scale-telekom-nav-list>
  
      <!-- main-nav -->
      <scale-telekom-mobile-menu slot="mobile-main-nav">
        <scale-telekom-mobile-menu-item>
          <a href="#">Topic One</a>
            <a href="#">Topic One</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Item 1</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">More Options</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Item 1</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
                <a href="#">Even More</a>
                <scale-telekom-mobile-menu-item slot="children">
                  <a href="#">Item </a>
                </scale-telekom-mobile-menu-item>
                <scale-telekom-mobile-menu-item slot="children">
                    <a href="#">Item 2</a>
                </scale-telekom-mobile-menu-item>
                <scale-telekom-mobile-menu-item slot="children">
                    <a href="#">Item 3</a>
                </scale-telekom-mobile-menu-item>                                
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Item 3</a>
            </scale-telekom-mobile-menu-item>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Topic Three</a>
            </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item>
          <a href="#">Topic Two</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Menu Item 1</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Menu Item 2</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">Menu Item 3</a>
            </scale-telekom-mobile-menu-item>
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
  @media screen and (min-width: 1040px) {
    .burger-item {
      display: none;
    }
  }
  </style>
