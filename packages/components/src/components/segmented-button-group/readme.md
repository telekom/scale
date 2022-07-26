# scale-segmented-button-group



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                  | Type                         | Default                                              |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | ---------------------------- | ---------------------------------------------------- |
| `ariaLabelTranslation` | `aria-label-translation` | (optional) aria-label attribute needed for icon-only buttons | `string`                     | ``toggle button group with $slottedButtons buttons`` |
| `disabled`             | `disabled`               | (optional) If `true`, the group is disabled                  | `boolean`                    | `false`                                              |
| `multiSelect`          | `multi-select`           | (optional) more than one button selected possible            | `boolean`                    | `false`                                              |
| `size`                 | `size`                   | (optional) The size of the button, default is small          | `"large" \| "small" \| "xl"` | `'small'`                                            |
| `styles`               | `styles`                 | (optional) Injected CSS styles                               | `string`                     | `undefined`                                          |


## Events

| Event          | Description                                                                                        | Type               |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `scale-change` | Emitted when button is clicked                                                                     | `CustomEvent<any>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
