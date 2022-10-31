# scale-checkbox-group



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description                                                                                                 | Type      | Default          |
| ------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ---------------- |
| `ariaLabelCheckboxGroup` | `aria-label-checkbox-group` | <span style="color:red">**[DEPRECATED]**</span> - ariaLabelCheckboxGroup should replace ariaLabel<br/><br/> | `string`  | `undefined`      |
| `helperText`             | `helper-text`               | (optional) Input helper text                                                                                | `string`  | `undefined`      |
| `inputId`                | `input-id`                  | (optional) Input checkbox id                                                                                | `string`  | `undefined`      |
| `invalid`                | `invalid`                   | (optional) Input status                                                                                     | `boolean` | `false`          |
| `label`                  | `label`                     | (optional) Input label                                                                                      | `string`  | `''`             |
| `name`                   | `name`                      | (optional) Input name                                                                                       | `string`  | `undefined`      |
| `selectText`             | `select-text`               |                                                                                                             | `string`  | `'Select all'`   |
| `status`                 | `status`                    | <span style="color:red">**[DEPRECATED]**</span> - invalid should replace status<br/><br/>                   | `string`  | `''`             |
| `styles`                 | `styles`                    | (optional) Injected CSS styles                                                                              | `string`  | `undefined`      |
| `unselectText`           | `unselect-text`             |                                                                                                             | `string`  | `'Unselect all'` |
| `value`                  | `value`                     | (optional) Input value                                                                                      | `string`  | `''`             |


## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"fieldset"`        |             |
| `"parent-checkbox"` |             |


## Dependencies

### Depends on

- [scale-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  scale-checkbox-group --> scale-checkbox
  scale-checkbox --> scale-icon-action-indeterminate
  scale-checkbox --> scale-icon-action-success
  scale-checkbox --> scale-icon-alert-information
  scale-checkbox --> scale-icon-alert-error
  style scale-checkbox-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
