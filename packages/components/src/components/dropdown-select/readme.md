# scale-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default      |
| ------------- | ------------- | ----------- | --------- | ------------ |
| `comboboxId`  | `combobox-id` |             | `string`  | `'combobox'` |
| `disabled`    | `disabled`    |             | `boolean` | `undefined`  |
| `helperText`  | `helper-text` |             | `string`  | `''`         |
| `invalid`     | `invalid`     |             | `boolean` | `false`      |
| `label`       | `label`       |             | `string`  | `undefined`  |
| `readonly`    | `readonly`    |             | `boolean` | `undefined`  |
| `size`        | `size`        |             | `string`  | `''`         |
| `transparent` | `transparent` |             | `boolean` | `undefined`  |
| `value`       | `value`       |             | `any`     | `undefined`  |


## Events

| Event           | Description | Type                |
| --------------- | ----------- | ------------------- |
| `scale-blur`    |             | `CustomEvent<void>` |
| `scale-change`  |             | `CustomEvent<void>` |
| `scale-focus`   |             | `CustomEvent<void>` |
| `scale-keydown` |             | `CustomEvent<void>` |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"combobox-container"` |             |
| `"helper-text"`        |             |
| `"icon"`               |             |
| `"label"`              |             |
| `"listbox"`            |             |
| `"meta"`               |             |


## Dependencies

### Depends on

- [scale-icon-navigation-collapse-up](../icons/navigation-collapse-up)
- [scale-icon-navigation-collapse-down](../icons/navigation-collapse-down)

### Graph
```mermaid
graph TD;
  scale-dropdown-select --> scale-icon-navigation-collapse-up
  scale-dropdown-select --> scale-icon-navigation-collapse-down
  style scale-dropdown-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
