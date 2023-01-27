# scale-telekom-nav-item



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type     | Default     |
| ------------------ | -------------------- | ----------- | -------- | ----------- |
| `appName`          | `app-name`           |             | `string` | `undefined` |
| `appNameClick`     | `app-name-click`     |             | `any`    | `undefined` |
| `appNameLink`      | `app-name-link`      |             | `string` | `undefined` |
| `closeButtonLabel` | `close-button-label` |             | `string` | `'Close'`   |
| `closeButtonTitle` | `close-button-title` |             | `string` | `null`      |


## Events

| Event                    | Description | Type               |
| ------------------------ | ----------- | ------------------ |
| `scale-close-nav-flyout` |             | `CustomEvent<any>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"base"`         |             |
| `"body"`         |             |
| `"close-button"` |             |
| `"header"`       |             |
| `"heading"`      |             |
| `"meta"`         |             |


## Dependencies

### Depends on

- [scale-button](../../button)
- [scale-icon-action-close](../../icons/action-close)

### Graph
```mermaid
graph TD;
  scale-telekom-mobile-flyout-canvas --> scale-button
  scale-telekom-mobile-flyout-canvas --> scale-icon-action-close
  style scale-telekom-mobile-flyout-canvas fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
