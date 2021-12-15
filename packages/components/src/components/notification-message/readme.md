# scale-notification-message



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                                                   | Default           |
| ------------- | ------------- | ----------- | ------------------------------------------------------ | ----------------- |
| `dismissible` | `dismissible` |             | `boolean`                                              | `false`           |
| `opened`      | `opened`      |             | `boolean`                                              | `undefined`       |
| `timeout`     | `timeout`     |             | `boolean \| number`                                    | `false`           |
| `variant`     | `variant`     |             | `"error" \| "informational" \| "success" \| "warning"` | `'informational'` |


## Methods

### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"heading"`   |             |
| `"text"`      |             |


## Dependencies

### Depends on

- [scale-notification-message-svg](svg)
- [scale-icon-alert-information](../icons/alert-information)
- [scale-icon-alert-warning](../icons/alert-warning)
- [scale-icon-action-circle-close](../icons/action-circle-close)

### Graph
```mermaid
graph TD;
  scale-notification-message --> scale-notification-message-svg
  scale-notification-message --> scale-icon-alert-information
  scale-notification-message --> scale-icon-alert-warning
  scale-notification-message --> scale-icon-action-circle-close
  style scale-notification-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
