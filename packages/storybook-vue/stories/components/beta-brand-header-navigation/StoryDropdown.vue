<template>
    <scale-telekom-header :app-name="appName" :app-name-link="appNameLink">
        <scale-telekom-nav-list slot="main-nav">
        <scale-menu-flyout>
            <scale-telekom-nav-item slot="trigger" class="foobar" >
              <a href="javascript:void(0);">Topic One</a>
            </scale-telekom-nav-item>
            <scale-menu-flyout-list>
              <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
              <scale-menu-flyout-item>
                More Options
                <scale-menu-flyout-list slot="sublist">
                  <scale-menu-flyout-item>
                    Item 1
                  </scale-menu-flyout-item>
                  <scale-menu-flyout-item>
                    Even More
                    <scale-menu-flyout-list slot="sublist">
                      <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
                      <scale-menu-flyout-item> Item 2</scale-menu-flyout-item>
                      <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
                    </scale-menu-flyout-list>
                  </scale-menu-flyout-item>
                  <scale-menu-flyout-item>
                    Item 3
                  </scale-menu-flyout-item>
                </scale-menu-flyout-list>
              </scale-menu-flyout-item>              
              <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
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
  