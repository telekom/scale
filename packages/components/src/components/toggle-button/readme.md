# scale-toggle-button



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                                                                                                            | Type                                      | Default        |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------- |
| `ariaDescriptionTranslation` | `aria-description-translation` | a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties. | `string`                                  | `'$selected'`  |
| `ariaLabel`                  | `aria-label`                   | (optional) aria-label attribute needed for icon-only buttons                                                                                           | `string`                                  | `undefined`    |
| `ariaLangDeselected`         | `aria-lang-deselected`         | (optional) translation of 'deselected                                                                                                                  | `string`                                  | `'deselected'` |
| `ariaLangSelected`           | `aria-lang-selected`           | (optional) translation of 'selected                                                                                                                    | `string`                                  | `'selected'`   |
| `colorScheme`                | `color-scheme`                 | (optional) background color scheme of a selected button                                                                                                | `"dark" \| "light"`                       | `'light'`      |
| `disabled`                   | `disabled`                     | (optional) If `true`, the button is disabled                                                                                                           | `boolean`                                 | `false`        |
| `iconOnly`                   | `icon-only`                    | (optional) Button type                                                                                                                                 | `boolean`                                 | `false`        |
| `iconPosition`               | `icon-position`                | (optional) Icon position related to the label                                                                                                          | `"after" \| "before"`                     | `'before'`     |
| `position`                   | `position`                     | (optional) position within group                                                                                                                       | `number`                                  | `undefined`    |
| `radius`                     | `radius`                       | (optional) set the border-radius left, right or both                                                                                                   | `"both" \| "left" \| "right"`             | `null`         |
| `selected`                   | `selected`                     | (optional) If `true`, the button is selected                                                                                                           | `boolean`                                 | `false`        |
| `size`                       | `size`                         | (optional) The size of the button                                                                                                                      | `"large" \| "regular" \| "small" \| "xs"` | `'large'`      |
| `styles`                     | `styles`                       | (optional) Injected CSS styles                                                                                                                         | `string`                                  | `undefined`    |
| `toggleButtonId`             | `toggle-button-id`             | (optional) toggle button's id                                                                                                                          | `string`                                  | `undefined`    |
| `variant`                    | `variant`                      | (optional) Button variant                                                                                                                              | `"primary" \| "secondary"`                | `'primary'`    |


## Events

| Event        | Description                    | Type                                              |
| ------------ | ------------------------------ | ------------------------------------------------- |
| `scaleClick` | Emitted when button is clicked | `CustomEvent<{ id: string; selected: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
