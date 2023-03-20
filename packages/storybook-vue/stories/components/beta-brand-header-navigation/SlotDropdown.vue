<template>
        <scale-telekom-nav-list slot="main-nav">
        <scale-menu-flyout>
            <scale-telekom-nav-item slot="trigger">
              <button>Topic One</button>
            </scale-telekom-nav-item>
            <scale-menu-flyout-list brand-header-dropdown>
              <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
              <scale-menu-flyout-item>
                More Options
                <scale-menu-flyout-list slot="sublist" brand-header-dropdown>
                  <scale-menu-flyout-item>
                    Item 1
                  </scale-menu-flyout-item>
                  <scale-menu-flyout-item>
                    Even More
                    <scale-menu-flyout-list slot="sublist" brand-header-dropdown>
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
          <scale-telekom-nav-item slot="trigger">
            <button>Topic Two</button>
          </scale-telekom-nav-item>   
          <scale-menu-flyout-list brand-header-dropdown>
            <scale-menu-flyout-item>Menu Item 1</scale-menu-flyout-item>
            <scale-menu-flyout-item>Menu Item 2</scale-menu-flyout-item>
            <scale-menu-flyout-item>Menu Item 3</scale-menu-flyout-item>
          </scale-menu-flyout-list>
        </scale-menu-flyout>     
      </scale-telekom-nav-list>
  </template>
  