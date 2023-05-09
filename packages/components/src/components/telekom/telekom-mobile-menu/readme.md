# scale-telekom-mobile-menu



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type     | Default     |
| ----------------- | ------------------- | ----------- | -------- | ----------- |
| `appName`         | `app-name`          |             | `string` | `undefined` |
| `appNameClick`    | `app-name-click`    |             | `any`    | `undefined` |
| `appNameLink`     | `app-name-link`     |             | `string` | `undefined` |
| `backButtonTitle` | `back-button-title` |             | `string` | `'Back'`    |


## Events

| Event                    | Description | Type               |
| ------------------------ | ----------- | ------------------ |
| `scale-close-nav-flyout` |             | `CustomEvent<any>` |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"back-button"` |             |
| `"base"`        |             |
| `"nav"`         |             |


## Dependencies

### Used by

 - [scale-telekom-header-data-back-compat](../telekom-header-data-back-compat)

### Depends on

- [scale-icon-navigation-left](../../icons/navigation-left)

### Graph
```mermaid
graph TD;
  scale-telekom-mobile-menu --> scale-icon-navigation-left
  scale-telekom-header-data-back-compat --> scale-telekom-mobile-menu
  style scale-telekom-mobile-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
