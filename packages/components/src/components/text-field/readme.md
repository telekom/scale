# scale-text-field



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                             | Type                                                                                  | Default     |
| ------------- | ------------- | --------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| `counter`     | `counter`     | (optional) Input counter                | `boolean`                                                                             | `undefined` |
| `disabled`    | `disabled`    | (optional) Input disabled               | `boolean`                                                                             | `undefined` |
| `helperText`  | `helper-text` | (optional) Input helper text            | `string`                                                                              | `''`        |
| `inputId`     | `input-id`    | (optional) Input checkbox id            | `string`                                                                              | `undefined` |
| `label`       | `label`       | (optional) Input label                  | `string`                                                                              | `''`        |
| `list`        | `list`        | (optional) input list                   | `string`                                                                              | `undefined` |
| `maxLength`   | `max-length`  | (optional) Input max length             | `number`                                                                              | `undefined` |
| `minLength`   | `min-length`  | (optional) Input min length             | `number`                                                                              | `undefined` |
| `name`        | `name`        | (optional) Input name                   | `string`                                                                              | `''`        |
| `placeholder` | `placeholder` | (optional) Input placeHolder            | `string`                                                                              | `''`        |
| `readonly`    | `readonly`    | (optional) Input readonly               | `boolean`                                                                             | `undefined` |
| `required`    | `required`    | (optional) Input required               | `boolean`                                                                             | `undefined` |
| `size`        | `size`        | (optional) Input size                   | `string`                                                                              | `''`        |
| `status`      | `status`      | (optional) Input status                 | `string`                                                                              | `''`        |
| `styles`      | `styles`      | (optional) Injected CSS styles          | `string`                                                                              | `undefined` |
| `transparent` | `transparent` | (optional) input background transparent | `boolean`                                                                             | `undefined` |
| `type`        | `type`        | (optional) Input type                   | `"date" \| "email" \| "hidden" \| "number" \| "password" \| "tel" \| "text" \| "url"` | `'text'`    |
| `value`       | `value`       | (optional) Input value                  | `number \| string`                                                                    | `''`        |


## Events

| Event          | Description                             | Type                                  |
| -------------- | --------------------------------------- | ------------------------------------- |
| `scaleBlur`    | Emitted when the input loses focus.     | `CustomEvent<void>`                   |
| `scaleChange`  | Emitted when the value has changed.     | `CustomEvent<InputChangeEventDetail>` |
| `scaleFocus`   | Emitted when the input has focus.       | `CustomEvent<void>`                   |
| `scaleInput`   | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>`          |
| `scaleKeyDown` | Emitted on keydown.                     | `CustomEvent<KeyboardEvent>`          |


## Dependencies

### Used by

 - [scale-data-grid](../data-grid)

### Graph
```mermaid
graph TD;
  scale-data-grid --> scale-text-field
  style scale-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
