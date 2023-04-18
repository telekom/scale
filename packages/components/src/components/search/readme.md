# scale-search



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                 | Description                                                                                                      | Type      | Default     |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `ariaDetailedId`         | `aria-detailed-id`        | (optional) id or space separated list of ids of elements that provide or link to additional related information. | `string`  | `undefined` |
| `disabled`               | `disabled`                | (optional) Input disabled                                                                                        | `boolean` | `undefined` |
| `experimentalControlled` | `experimental-controlled` | (optional)) Makes type `input` behave as a controlled component in React                                         | `boolean` | `false`     |
| `hideLabelVisually`      | `hide-label-visually`     | (optional) to avoid displaying the label                                                                         | `boolean` | `false`     |
| `inputAutocomplete`      | `input-autocomplete`      | (optional) custom value for autocomplete HTML attribute                                                          | `string`  | `undefined` |
| `inputAutofocus`         | `input-autofocus`         | (optional) the input should automatically get focus when the page loads.                                         | `boolean` | `undefined` |
| `inputId`                | `input-id`                | (optional) Input id                                                                                              | `string`  | `undefined` |
| `invalid`                | `invalid`                 | (optional) Input status                                                                                          | `boolean` | `false`     |
| `maxLength`              | `max-length`              | (optional) Input text string max length                                                                          | `number`  | `undefined` |
| `minLength`              | `min-length`              | (optional) Input text string min length                                                                          | `number`  | `undefined` |
| `name`                   | `name`                    | (optional) Input name                                                                                            | `string`  | `'Search'`  |
| `placeholder`            | `placeholder`             | (optional) Input placeHolder                                                                                     | `string`  | `'Search'`  |
| `required`               | `required`                | (optional) Input required                                                                                        | `boolean` | `undefined` |
| `styles`                 | `styles`                  | (optional) Injected CSS styles                                                                                   | `string`  | `undefined` |
| `transparent`            | `transparent`             | (optional) input background transparent                                                                          | `boolean` | `undefined` |
| `value`                  | `value`                   | (optional) Input value                                                                                           | `string`  | `''`        |


## Events

| Event             | Description                                                                                        | Type                                  |
| ----------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `scale-blur`      | Emitted when the input loses focus.                                                                | `CustomEvent<void>`                   |
| `scale-change`    | Emitted when the value has changed.                                                                | `CustomEvent<InputChangeEventDetail>` |
| `scale-focus`     | Emitted when the input has focus.                                                                  | `CustomEvent<void>`                   |
| `scale-focus-out` | Emitted when the input has focus.                                                                  | `CustomEvent<void>`                   |
| `scale-input`     | Emitted when a keyboard input occurred.                                                            | `CustomEvent<KeyboardEvent>`          |
| `scale-keydown`   | Emitted on keydown.                                                                                | `CustomEvent<KeyboardEvent>`          |
| `scaleBlur`       | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<void>`                   |
| `scaleChange`     | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<InputChangeEventDetail>` |
| `scaleFocus`      | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<void>`                   |
| `scaleInput`      | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<KeyboardEvent>`          |
| `scaleKeydown`    | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<KeyboardEvent>`          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
