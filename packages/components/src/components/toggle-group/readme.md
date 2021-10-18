# scale-toggle-group



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                  | Type                                      | Default                                              |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | ----------------------------------------- | ---------------------------------------------------- |
| `ariaLabelTranslation` | `aria-label-translation` | (optional) aria-label attribute needed for icon-only buttons | `string`                                  | ``toggle button group with $slottedButtons buttons`` |
| `background`           | `background`             | (optional) Button Group background                           | `"grey" \| "white"`                       | `'white'`                                            |
| `colorScheme`          | `color-scheme`           | (optional) background color scheme of a selected button      | `"dark" \| "light"`                       | `'light'`                                            |
| `disabled`             | `disabled`               | (optional) If `true`, the button is disabled                 | `boolean`                                 | `false`                                              |
| `fullWidth`            | `full-width`             | (optional) 100% width                                        | `boolean`                                 | `false`                                              |
| `hideBorder`           | `hide-border`            | (optional) If `true`, the group has a border                 | `boolean`                                 | `false`                                              |
| `singleSelect`         | `single-select`          | (optional) more than one button selected possible            | `boolean`                                 | `false`                                              |
| `size`                 | `size`                   | (optional) The size of the button                            | `"large" \| "regular" \| "small" \| "xs"` | `'large'`                                            |
| `styles`               | `styles`                 | (optional) Injected CSS styles                               | `string`                                  | `undefined`                                          |


## Events

| Event          | Description                                                                                        | Type               |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `scale-change` | Emitted when button is clicked                                                                     | `CustomEvent<any>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
