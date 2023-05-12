# scale-telekom-nav-flyout



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                            | Type       | Default     |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------- | ---------- | ----------- |
| `expanded`        | `expanded`         | Open the flyout menu                                                                   | `boolean`  | `false`     |
| `hover`           | `hover`            | (optinal) Whether the flyout should open on hover (needs better name!)                 | `boolean`  | `false`     |
| `triggerSelector` | `trigger-selector` | (optional) Selector to query the trigger element in case it's not the previous sibling | `string`   | `undefined` |
| `variant`         | `variant`          | (optional) Variant ("mobile" gives it a fixed height of `100vh`)                       | `"mobile"` | `null`      |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `scale-expanded` |             | `CustomEvent<any>` |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [scale-telekom-header-data-back-compat](../telekom-header-data-back-compat)

### Graph
```mermaid
graph TD;
  scale-telekom-header-data-back-compat --> scale-telekom-nav-flyout
  style scale-telekom-nav-flyout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
