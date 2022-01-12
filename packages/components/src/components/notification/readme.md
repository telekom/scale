# scale-notification

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                                                   | Default           |
| ------------------ | -------------------- | ----------- | ------------------------------------------------------ | ----------------- |
| `autoHide`         | `auto-hide`          |             | `boolean`                                              | `false`           |
| `autoHideDuration` | `auto-hide-duration` |             | `number`                                               | `3000`            |
| `dismissible`      | `dismissible`        |             | `boolean`                                              | `false`           |
| `href`             | `href`               |             | `string`                                               | `undefined`       |
| `opened`           | `opened`             |             | `boolean`                                              | `undefined`       |
| `type`             | `type`               |             | `"banner" \| "inline" \| "toast"`                      | `'inline'`        |
| `variant`          | `variant`            |             | `"error" \| "informational" \| "success" \| "warning"` | `'informational'` |


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
- [scale-icon-action-circle-close](../icons/action-circle-close)
- [scale-link](../link)

### Graph
```mermaid
graph TD;
  scale-notification --> scale-icon-alert-success
  scale-notification --> scale-icon-alert-information
  scale-notification --> scale-icon-alert-error
  scale-notification --> scale-icon-action-circle-close
  scale-notification --> scale-link
  style scale-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
