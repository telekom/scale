# scale-shell



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                    | Type      | Default     |
| --------------------- | ------------------------ | ------------------------------ | --------- | ----------- |
| `activeRouteId`       | `active-route-id`        |                                | `string`  | `''`        |
| `activeSectorId`      | `active-sector-id`       |                                | `string`  | `''`        |
| `addonNavigation`     | `addon-navigation`       |                                | `any`     | `[]`        |
| `claimLang`           | `claim-lang`             |                                | `string`  | `'de'`      |
| `iconNavigation`      | `icon-navigation`        |                                | `any`     | `[]`        |
| `logoAriaDescribedBy` | `logo-aria-described-by` |                                | `string`  | `undefined` |
| `logoClick`           | `logo-click`             |                                | `any`     | `undefined` |
| `logoHref`            | `logo-href`              |                                | `string`  | `undefined` |
| `logoTitle`           | `logo-title`             |                                | `string`  | `undefined` |
| `mainNavigation`      | `main-navigation`        |                                | `any`     | `[]`        |
| `portalName`          | `portal-name`            |                                | `string`  | `''`        |
| `sectorNavigation`    | `sector-navigation`      |                                | `any`     | `[]`        |
| `sticky`              | `sticky`                 |                                | `boolean` | `false`     |
| `styles`              | `styles`                 | (optional) Injected CSS styles | `string`  | `undefined` |
| `userNavigation`      | `user-navigation`        |                                | `any`     | `[]`        |


## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"base"` |             |


## Dependencies

### Depends on

- [scale-app-header](../app-header)

### Graph
```mermaid
graph TD;
  scale-app-shell --> scale-app-header
  scale-app-header --> scale-nav-main
  scale-app-header --> app-mega-menu
  scale-app-header --> scale-nav-icon
  scale-app-header --> scale-menu-flyout
  scale-app-header --> scale-menu-flyout-list
  scale-app-header --> app-navigation-user-menu
  scale-app-header --> scale-nav-segment
  scale-app-header --> scale-logo
  scale-app-header --> app-navigation-sector-mobile
  scale-app-header --> app-navigation-main-mobile
  scale-nav-icon --> scale-notification-badge
  scale-nav-icon --> scale-icon
  app-navigation-user-menu --> scale-button
  app-navigation-user-menu --> scale-icon
  scale-logo --> scale-logo-svg
  app-navigation-main-mobile --> scale-icon-navigation-left
  app-navigation-main-mobile --> scale-icon-navigation-right
  style scale-app-shell fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
