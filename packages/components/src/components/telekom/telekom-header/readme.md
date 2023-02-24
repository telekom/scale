# scale-telekom-header



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description | Type     | Default     |
| -------------- | ---------------- | ----------- | -------- | ----------- |
| `appName`      | `app-name`       |             | `string` | `undefined` |
| `appNameClick` | `app-name-click` |             | `any`    | `undefined` |
| `appNameLink`  | `app-name-link`  |             | `string` | `undefined` |


## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"app-logo"`        |             |
| `"app-name-text"`   |             |
| `"body"`            |             |
| `"bottom-app-name"` |             |
| `"bottom-bar"`      |             |
| `"bottom-body"`     |             |
| `"container"`       |             |
| `"fixed-wrapper"`   |             |
| `"top-app-name"`    |             |
| `"top-bar"`         |             |
| `"top-body"`        |             |


## Dependencies

### Used by

 - [scale-telekom-header-data-back-compat](../telekom-header-data-back-compat)

### Depends on

- [scale-logo](../logo)

### Graph
```mermaid
graph TD;
  scale-telekom-header --> scale-logo
  scale-logo --> scale-logo-svg
  scale-telekom-header-data-back-compat --> scale-telekom-header
  style scale-telekom-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
