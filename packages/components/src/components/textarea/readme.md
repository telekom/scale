# scale-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                             | Type                                              | Default     |
| ------------- | ------------- | --------------------------------------- | ------------------------------------------------- | ----------- |
| `cols`        | `cols`        | (optional) textarea column              | `number`                                          | `undefined` |
| `counter`     | `counter`     | (optional) Input counter                | `boolean`                                         | `undefined` |
| `disabled`    | `disabled`    | (optional) Input disabled               | `boolean`                                         | `undefined` |
| `helperText`  | `helper-text` | (optional) Input helper text            | `string`                                          | `''`        |
| `inputId`     | `input-id`    | (optional) Input checkbox id            | `string`                                          | `undefined` |
| `label`       | `label`       | (optional) Input label                  | `string`                                          | `''`        |
| `maxLength`   | `max-length`  | (optional) Input max length             | `number`                                          | `undefined` |
| `minLength`   | `min-length`  | (optional) Input min length             | `number`                                          | `undefined` |
| `name`        | `name`        | (optional) Input name                   | `string`                                          | `''`        |
| `placeholder` | `placeholder` | (optional) Input placeHolder            | `string`                                          | `''`        |
| `required`    | `required`    | (optional) Input required               | `boolean`                                         | `undefined` |
| `resize`      | `resize`      | (optional) textarea resize              | `"horizontal" \| "none" \| "unset" \| "vertical"` | `undefined` |
| `rows`        | `rows`        | (optional) textarea row                 | `number`                                          | `undefined` |
| `status`      | `status`      | (optional) Input status                 | `string`                                          | `''`        |
| `styles`      | `styles`      | (optional) Injected CSS styles          | `string`                                          | `undefined` |
| `transparent` | `transparent` | (optional) input background transparent | `boolean`                                         | `undefined` |
| `value`       | `value`       | (optional) Input value                  | `number \| string`                                | `''`        |


## Events

| Event          | Description                             | Type                                  |
| -------------- | --------------------------------------- | ------------------------------------- |
| `scaleBlur`    | Emitted when the input loses focus.     | `CustomEvent<void>`                   |
| `scaleChange`  | Emitted when the value has changed.     | `CustomEvent<InputChangeEventDetail>` |
| `scaleFocus`   | Emitted when the input has focus.       | `CustomEvent<void>`                   |
| `scaleInput`   | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>`          |
| `scaleKeyDown` | Emitted on keydown.                     | `CustomEvent<KeyboardEvent>`          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
