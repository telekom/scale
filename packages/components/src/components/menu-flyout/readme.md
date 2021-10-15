# scale-menu



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                                        | Type                                                                                | Default          |
| --------------- | ----------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------- |
| `closeOnSelect` | `close-on-select` | (optional) Determines whether the flyout should close when a menu item is selected | `boolean`                                                                           | `true`           |
| `direction`     | `direction`       | (optional) Set preference for where the menu appears, space permitting             | `"bottom-left" \| "bottom-right" \| "left" \| "right" \| "top-left" \| "top-right"` | `'bottom-right'` |
| `styles`        | `styles`          | (optional) Injected styles                                                         | `string`                                                                            | `undefined`      |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"trigger"` |             |


## Dependencies

### Used by

 - [scale-data-grid](../data-grid)

### Graph
```mermaid
graph TD;
  scale-data-grid --> scale-menu-flyout
  style scale-menu-flyout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
