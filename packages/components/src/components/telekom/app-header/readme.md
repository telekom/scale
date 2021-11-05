# scale-header



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type      | Default     |
| --------------------- | ------------------------ | ----------- | --------- | ----------- |
| `activeRouteId`       | `active-route-id`        |             | `string`  | `undefined` |
| `activeSectorId`      | `active-sector-id`       |             | `string`  | `undefined` |
| `addonNavigation`     | `addon-navigation`       |             | `any`     | `[]`        |
| `claimLang`           | `claim-lang`             |             | `string`  | `undefined` |
| `iconNavigation`      | `icon-navigation`        |             | `any`     | `[]`        |
| `isMegaMenuVisible`   | `is-mega-menu-visible`   |             | `boolean` | `false`     |
| `isMobileMenuVisible` | `is-mobile-menu-visible` |             | `boolean` | `false`     |
| `logoClick`           | `logo-click`             |             | `any`     | `undefined` |
| `logoHref`            | `logo-href`              |             | `string`  | `undefined` |
| `logoTitle`           | `logo-title`             |             | `string`  | `undefined` |
| `mainNavigation`      | `main-navigation`        |             | `any`     | `[]`        |
| `portalName`          | `portal-name`            |             | `string`  | `''`        |
| `sectorNavigation`    | `sector-navigation`      |             | `any`     | `[]`        |


## Dependencies

### Used by

 - [scale-app-shell](../app-shell)

### Depends on

- [scale-nav-main](../nav-main)
- [app-mega-menu](../app-mega-menu)
- [scale-nav-icon](../nav-icon)
- [scale-nav-segment](../nav-segment)
- [app-logo](../app-logo)
- [app-navigation-sector-mobile](../app-navigation-sector-mobile)
- [app-navigation-main-mobile](../app-navigation-main-mobile)

### Graph
```mermaid
graph TD;
  scale-app-header --> scale-nav-main
  scale-app-header --> app-mega-menu
  scale-app-header --> scale-nav-icon
  scale-app-header --> scale-nav-segment
  scale-app-header --> app-logo
  scale-app-header --> app-navigation-sector-mobile
  scale-app-header --> app-navigation-main-mobile
  scale-nav-icon --> scale-icon
  app-navigation-main-mobile --> scale-icon-navigation-left
  app-navigation-main-mobile --> scale-icon-navigation-right
  scale-app-shell --> scale-app-header
  style scale-app-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
