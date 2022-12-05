# scale-segmented-button-group



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                  | Type                         | Default                                               |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | ---------------------------- | ----------------------------------------------------- |
| `ariaLabelTranslation` | `aria-label-translation` | (optional) aria-label attribute needed for icon-only buttons | `string`                     | ``segment button group with $slottedButtons buttons`` |
| `disabled`             | `disabled`               | (optional) If `true`, the group is disabled                  | `boolean`                    | `false`                                               |
| `fullWidth`            | `full-width`             | (optional) If `true`, expand to container width              | `boolean`                    | `false`                                               |
| `longestButtonWidth`   | `longest-button-width`   |                                                              | `string`                     | `undefined`                                           |
| `multiSelect`          | `multi-select`           | (optional) Allow more than one button to be selected         | `boolean`                    | `false`                                               |
| `size`                 | `size`                   | (optional) The size of the button                            | `"large" \| "small" \| "xl"` | `'small'`                                             |
| `styles`               | `styles`                 | (optional) Injected CSS styles                               | `string`                     | `undefined`                                           |


## Events

| Event          | Description                                                                                        | Type               |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `scale-change` | Emitted when button is clicked                                                                     | `CustomEvent<any>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
