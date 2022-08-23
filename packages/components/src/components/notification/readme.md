# scale-notification



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                | Type                                                   | Default           |
| --------- | --------- | -------------------------- | ------------------------------------------------------ | ----------------- |
| `heading` | `heading` | Heading                    | `string`                                               | `undefined`       |
| `opened`  | `opened`  | (optional) Toast opened    | `boolean`                                              | `undefined`       |
| `styles`  | `styles`  | (optional) Injected styles | `string`                                               | `undefined`       |
| `variant` | `variant` | (optional) Variant         | `"error" \| "informational" \| "success" \| "warning"` | `'informational'` |


## Dependencies

### Depends on

- [scale-icon-alert-success](../icons/alert-success)
- [scale-icon-alert-information](../icons/alert-information)
- [scale-icon-alert-error](../icons/alert-error)
- [scale-icon-alert-warning](../icons/alert-warning)

### Graph
```mermaid
graph TD;
  scale-notification --> scale-icon-alert-success
  scale-notification --> scale-icon-alert-information
  scale-notification --> scale-icon-alert-error
  scale-notification --> scale-icon-alert-warning
  style scale-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
