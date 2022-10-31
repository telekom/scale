# scale-notification-message

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                                                   | Default           |
| ------------------ | -------------------- | ----------- | ------------------------------------------------------ | ----------------- |
| `autoHide`         | `auto-hide`          |             | `boolean`                                              | `false`           |
| `autoHideDuration` | `auto-hide-duration` |             | `number`                                               | `3000`            |
| `dismissible`      | `dismissible`        |             | `boolean`                                              | `false`           |
| `opened`           | `opened`             |             | `boolean`                                              | `undefined`       |
| `variant`          | `variant`            |             | `"error" \| "informational" \| "success" \| "warning"` | `'informational'` |


## Events

| Event         | Description                                            | Type                |
| ------------- | ------------------------------------------------------ | ------------------- |
| `scale-close` | Fires when the notification message has been dismissed | `CustomEvent<void>` |


## Methods

### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"button-dismissable"` |             |
| `"container"`          |             |
| `"heading"`            |             |
| `"text"`               |             |


## Dependencies

### Depends on

- [scale-icon-alert-success](../icons/alert-success)
- [scale-icon-alert-information](../icons/alert-information)
- [scale-icon-alert-error](../icons/alert-error)
- [scale-icon-alert-warning](../icons/alert-warning)
- [scale-icon-action-circle-close](../icons/action-circle-close)

### Graph
```mermaid
graph TD;
  scale-notification-message --> scale-icon-alert-success
  scale-notification-message --> scale-icon-alert-information
  scale-notification-message --> scale-icon-alert-error
  scale-notification-message --> scale-icon-alert-warning
  scale-notification-message --> scale-icon-action-circle-close
  style scale-notification-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
