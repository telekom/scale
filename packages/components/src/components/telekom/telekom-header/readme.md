# scale-telekom-header



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type     | Default             |
| --------------------- | ----------------------- | ----------- | -------- | ------------------- |
| `mainNavigation`      | `main-navigation`       |             | `any`    | `undefined`         |
| `mainNavigationLabel` | `main-navigation-label` |             | `string` | `'Main Navigation'` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"main-nav"`   |             |
| `"portalname"` |             |


## Dependencies

### Depends on

- [scale-logo](../logo)
- [scale-telekom-main-nav-item](../telekom-main-nav-item)

### Graph
```mermaid
graph TD;
  scale-telekom-header --> scale-logo
  scale-telekom-header --> scale-telekom-main-nav-item
  scale-logo --> scale-logo-svg
  style scale-telekom-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
