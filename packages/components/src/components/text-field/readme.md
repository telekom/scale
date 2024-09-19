# scale-text-field

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                 | Description                                                                                                      | Type                                                                                                                                     | Default           |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `ariaDetailedId`         | `aria-detailed-id`        | (optional) id or space separated list of ids of elements that provide or link to additional related information. | `string`                                                                                                                                 | `undefined`       |
| `counter`                | `counter`                 | (optional) Input counter                                                                                         | `boolean`                                                                                                                                | `undefined`       |
| `disabled`               | `disabled`                | (optional) Input disabled                                                                                        | `boolean`                                                                                                                                | `undefined`       |
| `experimentalControlled` | `experimental-controlled` | (optional)) Makes type `input` behave as a controlled component in React                                         | `boolean`                                                                                                                                | `false`           |
| `helperText`             | `helper-text`             | (optional) Input helper text                                                                                     | `string`                                                                                                                                 | `''`              |
| `hideLabelVisually`      | `hide-label-visually`     | (optional) to avoid displaying the label                                                                         | `boolean`                                                                                                                                | `false`           |
| `inputAutocomplete`      | `input-autocomplete`      | (optional) custom value for autocomplete HTML attribute                                                          | `string`                                                                                                                                 | `undefined`       |
| `inputAutofocus`         | `input-autofocus`         | (optional) the input should automatically get focus when the page loads.                                         | `boolean`                                                                                                                                | `undefined`       |
| `inputId`                | `input-id`                | (optional) Input checkbox id                                                                                     | `string`                                                                                                                                 | `undefined`       |
| `inputModeType`          | `input-mode-type`         | (optional) Input mode                                                                                            | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"`                                                    | `'text'`          |
| `invalid`                | `invalid`                 | (optional) Input status                                                                                          | `boolean`                                                                                                                                | `false`           |
| `label`                  | `label`                   | Input label                                                                                                      | `string`                                                                                                                                 | `''`              |
| `list`                   | `list`                    | (optional) input list                                                                                            | `string`                                                                                                                                 | `undefined`       |
| `max`                    | `max`                     | (optional) define the numeric maximum value of input types such as month, date, time                             | `number`                                                                                                                                 | `undefined`       |
| `maxLength`              | `max-length`              | (optional) Input text string max length                                                                          | `number`                                                                                                                                 | `undefined`       |
| `min`                    | `min`                     | (optional) defines the numeric minimum value of input types such as month, date, time                            | `number`                                                                                                                                 | `undefined`       |
| `minLength`              | `min-length`              | (optional) Input text string min length                                                                          | `number`                                                                                                                                 | `undefined`       |
| `name`                   | `name`                    | (optional) Input name                                                                                            | `string`                                                                                                                                 | `''`              |
| `placeholder`            | `placeholder`             | (optional) Input placeHolder                                                                                     | `string`                                                                                                                                 | `''`              |
| `readonly`               | `readonly`                | (optional) Input readonly                                                                                        | `boolean`                                                                                                                                | `undefined`       |
| `required`               | `required`                | (optional) Input required                                                                                        | `boolean`                                                                                                                                | `undefined`       |
| `size`                   | `size`                    | <span style="color:red">**[DEPRECATED]**</span> - css overwrite should replace size<br/><br/>                    | `string`                                                                                                                                 | `undefined`       |
| `status`                 | `status`                  | <span style="color:red">**[DEPRECATED]**</span> - invalid should replace status<br/><br/>                        | `string`                                                                                                                                 | `''`              |
| `step`                   | `step`                    | (optional) the step attribute specifies the interval between legal numbers in an <input type="number"> element.  | `string`                                                                                                                                 | `'1'`             |
| `styles`                 | `styles`                  | (optional) Injected CSS styles                                                                                   | `string`                                                                                                                                 | `undefined`       |
| `transparent`            | `transparent`             | (optional) input background transparent                                                                          | `boolean`                                                                                                                                | `undefined`       |
| `type`                   | `type`                    | (optional) Input type                                                                                            | `"date" \| "datetime-local" \| "email" \| "hidden" \| "month" \| "number" \| "password" \| "tel" \| "text" \| "time" \| "url" \| "week"` | `'text'`          |
| `value`                  | `value`                   | (optional) Input value                                                                                           | `number \| string`                                                                                                                       | `''`              |
| `variant`                | `variant`                 | (optional) Variant                                                                                               | `"danger" \| "informational" \| "success" \| "warning"`                                                                                  | `'informational'` |


## Events

| Event           | Description                                                                                        | Type                                  |
| --------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `scale-blur`    | Emitted when the input loses focus.                                                                | `CustomEvent<void>`                   |
| `scale-change`  | Emitted when the value has changed.                                                                | `CustomEvent<InputChangeEventDetail>` |
| `scale-focus`   | Emitted when the input has focus.                                                                  | `CustomEvent<void>`                   |
| `scale-input`   | Emitted when a keyboard input occurred.                                                            | `CustomEvent<KeyboardEvent>`          |
| `scale-keydown` | Emitted on keydown.                                                                                | `CustomEvent<KeyboardEvent>`          |
| `scaleBlur`     | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<void>`                   |
| `scaleChange`   | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<InputChangeEventDetail>` |
| `scaleFocus`    | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<void>`                   |
| `scaleInput`    | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<KeyboardEvent>`          |
| `scaleKeydown`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<KeyboardEvent>`          |


## Dependencies

### Used by

 - [scale-data-grid](../data-grid)

### Depends on

- [scale-helper-text](../helper-text)

### Graph
```mermaid
graph TD;
  scale-text-field --> scale-helper-text
  scale-helper-text --> scale-icon-alert-information
  scale-helper-text --> scale-icon-alert-error
  scale-helper-text --> scale-icon-action-success
  scale-data-grid --> scale-text-field
  style scale-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
