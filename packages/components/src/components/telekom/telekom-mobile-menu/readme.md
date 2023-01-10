# scale-telekom-mobile-menu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type     | Default     |
| ------------------ | -------------------- | ----------- | -------- | ----------- |
| `activeRouteId`    | `active-route-id`    |             | `string` | `undefined` |
| `appName`          | `app-name`           |             | `string` | `undefined` |
| `appNameClick`     | `app-name-click`     |             | `any`    | `undefined` |
| `appNameLink`      | `app-name-link`      |             | `string` | `undefined` |
| `closeButtonTitle` | `close-button-title` |             | `string` | `'Close'`   |


## Events

| Event                    | Description | Type               |
| ------------------------ | ----------- | ------------------ |
| `scale-close-nav-flyout` |             | `CustomEvent<any>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"app-name"`     |             |
| `"base"`         |             |
| `"close-button"` |             |
| `"links-top"`    |             |
| `"nav"`          |             |


## Dependencies

### Depends on

- [scale-icon-action-close](../../icons/action-close)
- [scale-telekom-app-name](../telekom-app-name)

### Graph
```mermaid
graph TD;
  scale-telekom-mobile-menu --> scale-icon-action-close
  scale-telekom-mobile-menu --> scale-telekom-app-name
  style scale-telekom-mobile-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
