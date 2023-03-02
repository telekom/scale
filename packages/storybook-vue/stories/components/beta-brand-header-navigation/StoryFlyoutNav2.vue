<template>
    <scale-telekom-header :app-name="appName" :app-name-link="appNameLink">
        <scale-telekom-nav-list slot="main-nav">
        <scale-menu-flyout>
            <scale-telekom-nav-item slot="trigger" class="foobar" >
              <a href="javascript:void(0);">Topic One</a>
            </scale-telekom-nav-item>
            <scale-menu-flyout-list>
              <scale-menu-flyout-item>Item Title</scale-menu-flyout-item>
              <scale-menu-flyout-item
                >Really Quite Long Item Title</scale-menu-flyout-item
              >
              <scale-menu-flyout-divider></scale-menu-flyout-divider>
              <scale-menu-flyout-item
                >Item With Suffix 1<span slot="suffix">⌘F</span></scale-menu-flyout-item
              >
              <scale-menu-flyout-item
                >Item With Suffix 2<span slot="suffix">⌘H</span></scale-menu-flyout-item
              >
              <scale-menu-flyout-divider></scale-menu-flyout-divider>
              <scale-menu-flyout-item>
                Other Options
                <scale-menu-flyout-list slot="sublist">
                  <scale-menu-flyout-item>
                    <scale-icon-action-cut-paste
                      slot="prefix"
                    ></scale-icon-action-cut-paste
                    >Item With Prefix 1
                  </scale-menu-flyout-item>
                  <scale-menu-flyout-item>
                    <scale-icon-action-loop slot="prefix"></scale-icon-action-loop>Item
                    With Prefix 2
                    <scale-menu-flyout-list slot="sublist">
                      <scale-menu-flyout-item>Third Level Item 1</scale-menu-flyout-item>
                      <scale-menu-flyout-item>Third Level Item 2</scale-menu-flyout-item>
                      <scale-menu-flyout-item>Third Level Item 3</scale-menu-flyout-item>
                    </scale-menu-flyout-list>
                  </scale-menu-flyout-item>
                  <scale-menu-flyout-item>
                    <scale-icon-action-more slot="prefix"></scale-icon-action-more>Item
                    With Prefix 3
                  </scale-menu-flyout-item>
                </scale-menu-flyout-list>
              </scale-menu-flyout-item>
            </scale-menu-flyout-list>
        </scale-menu-flyout>  

        <scale-menu-flyout>
          <scale-telekom-nav-item slot="trigger" class="foobar" >
            <a href="javascript:void(0);">Topic Two</a>
          </scale-telekom-nav-item>   
          <scale-menu-flyout-list>
            <scale-menu-flyout-item>Menu Item 1</scale-menu-flyout-item>
            <scale-menu-flyout-item>Menu Item 2</scale-menu-flyout-item>
            <scale-menu-flyout-item>Menu Item 3</scale-menu-flyout-item>
          </scale-menu-flyout-list>
        </scale-menu-flyout>     
      </scale-telekom-nav-list>
    </scale-telekom-header>
  </template>
  
  <script>
  </script>
  