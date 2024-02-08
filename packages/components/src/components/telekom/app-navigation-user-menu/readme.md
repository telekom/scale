# app-navigation-user-menu



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type         | Default     |
| ------------ | ------------ | ----------- | ------------ | ----------- |
| `hide`       | --           |             | `() => void` | `undefined` |
| `navigation` | `navigation` |             | `any`        | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `closeMenu` |             | `CustomEvent<any>` |


## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"rule-horizontal"` |             |


## Dependencies

### Used by

 - [scale-app-header](../app-header)
 - [scale-telekom-header-data-back-compat](../telekom-header-data-back-compat)

### Depends on

- [scale-button](../../button)
- [scale-icon](../../icon)

### Graph
```mermaid
graph TD;
  app-navigation-user-menu --> scale-button
  app-navigation-user-menu --> scale-icon
  scale-app-header --> app-navigation-user-menu
  scale-telekom-header-data-back-compat --> app-navigation-user-menu
  style app-navigation-user-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
