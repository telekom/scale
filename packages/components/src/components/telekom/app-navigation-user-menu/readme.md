# app-navigation-user-menu



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type         | Default     |
| ------------ | ------------ | ----------- | ------------ | ----------- |
| `hide`       | --           |             | `() => void` | `undefined` |
| `navigation` | `navigation` |             | `any`        | `undefined` |
| `styles`     | `styles`     |             | `string`     | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `closeMenu` |             | `CustomEvent<any>` |


## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"button"`          |             |
| `"item"`            |             |
| `"rule-horizontal"` |             |
| `"userinfo"`        |             |


## Dependencies

### Used by

 - [scale-app-header](../app-header)
 - [scale-telekom-header-data-back-compat](../telekom-header-data-back-compat)
 - [telekom-profile-menu](../profile-menu)

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
  telekom-profile-menu --> app-navigation-user-menu
  style app-navigation-user-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
