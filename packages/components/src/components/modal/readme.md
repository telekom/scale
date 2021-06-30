# scale-modal



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                              | Type                | Default          |
| ------------------- | --------------------- | -------------------------------------------------------- | ------------------- | ---------------- |
| `alignActions`      | `align-actions`       | (optional) Alignment of action buttons                   | `"left" \| "right"` | `'right'`        |
| `closeButtonLabel`  | `close-button-label`  | (optional) Label for close button                        | `string`            | `'Close Pop-up'` |
| `closeClickOutside` | `close-click-outside` | (optional) Enable/disable Modal closing on outside click | `boolean`           | `true`           |
| `customClass`       | `custom-class`        | (optional) Custom class                                  | `string`            | `''`             |
| `duration`          | `duration`            | (optional) Transition duration                           | `number`            | `200`            |
| `heading`           | `heading`             | Modal heading                                            | `string`            | `undefined`      |
| `opened`            | `opened`              | (optional) If `true`, the Modal is open.                 | `boolean`           | `false`          |
| `size`              | `size`                | (optional) Modal size                                    | `string`            | `'default'`      |
| `styles`            | `styles`              | (optional) Injected CSS styles                           | `string`            | `undefined`      |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `scaleClose`        |             | `CustomEvent<any>` |
| `scaleCloseAttempt` |             | `CustomEvent<any>` |
| `scaleOpen`         |             | `CustomEvent<any>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"backdrop"`     |             |
| `"close-button"` |             |
| `"heading"`      |             |


## Dependencies

### Depends on

- [scale-icon-action-circle-close](../icons/action-circle-close)

### Graph
```mermaid
graph TD;
  scale-modal --> scale-icon-action-circle-close
  style scale-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
