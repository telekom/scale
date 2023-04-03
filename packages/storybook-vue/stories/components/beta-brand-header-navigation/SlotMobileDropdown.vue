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
        <scale-telekom-mobile-menu-item>
          <a href="#">Topic One</a>
            <a href="#">Topic One</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level More Options</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">3. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
                <a href="#">3. Level More Options</a>
                <scale-telekom-mobile-menu-item slot="children">
                  <a href="#">4. Level Subcategory </a>
                </scale-telekom-mobile-menu-item>
                <scale-telekom-mobile-menu-item slot="children">
                    <a href="#">4. Level Subcategory</a>
                </scale-telekom-mobile-menu-item>
                <scale-telekom-mobile-menu-item slot="children">
                    <a href="#">4. Level Subcategory</a>
                </scale-telekom-mobile-menu-item>                                
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">3. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
        </scale-telekom-mobile-menu-item>
        <scale-telekom-mobile-menu-item>
          <a href="#">Topic Two</a>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level Subcategory</a>
            </scale-telekom-mobile-menu-item>
            <scale-telekom-mobile-menu-item slot="children">
              <a href="#">2. Level Subcategory</a>
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