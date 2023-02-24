# scale-telekom-footer-data-back-compat



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                      | Default                   |
| ------------------ | ------------------- | ----------- | ------------------------- | ------------------------- |
| `copyright`        | `copyright`         |             | `string`                  | `'© Deutsche Telekom AG'` |
| `footerNavigation` | `footer-navigation` |             | `any`                     | `[]`                      |
| `type`             | `type`              |             | `"minimal" \| "standard"` | `'standard'`              |


## Dependencies

### Depends on

- [scale-telekom-footer](../telekom-footer)
- [scale-telekom-footer-content](../telekom-footer)

### Graph
```mermaid
graph TD;
  scale-telekom-footer-data-back-compat --> scale-telekom-footer
  scale-telekom-footer-data-back-compat --> scale-telekom-footer-content
  scale-telekom-footer-content --> scale-logo
  scale-logo --> scale-logo-svg
  style scale-telekom-footer-data-back-compat fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
