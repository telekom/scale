# scale-helper-text



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                    | Type                                                                 | Default           |
| ------------ | ------------- | ------------------------------ | -------------------------------------------------------------------- | ----------------- |
| `helperText` | `helper-text` | (optional) Helper text         | `string`                                                             | `undefined`       |
| `styles`     | `styles`      | (optional) Injected CSS styles | `string`                                                             | `undefined`       |
| `variant`    | `variant`     | (optional) Injected CSS styles | `"danger" \| "informational" \| "neutral" \| "success" \| "warning"` | `'informational'` |


## Slots

| Slot        | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `"default"` | here goes the actual text of the                                     |
| `"icon"`    | a slot that will not be underlined and which position can be changed |


## Shadow Parts

| Part        | Description                                          |
| ----------- | ---------------------------------------------------- |
| `"anchor"`  | the native achor element wrapping all contents       |
| `"content"` | a wrapper around the default slot with the underline |


## Dependencies

### Used by

 - [scale-dropdown](../dropdown)
 - [scale-dropdown-select](../dropdown-select)
 - [scale-segmented-button-group](../segmented-button-group)
 - [scale-text-field](../text-field)

### Depends on

- [scale-icon-alert-information](../icons/alert-information)
- [scale-icon-alert-error](../icons/alert-error)
- [scale-icon-alert-success](../icons/alert-success)

### Graph
```mermaid
graph TD;
  scale-helper-text --> scale-icon-alert-information
  scale-helper-text --> scale-icon-alert-error
  scale-helper-text --> scale-icon-alert-success
  scale-dropdown --> scale-helper-text
  scale-dropdown-select --> scale-helper-text
  scale-segmented-button-group --> scale-helper-text
  scale-text-field --> scale-helper-text
  style scale-helper-text fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
