# scale-toggle-button



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                                                                                                            | Type                                       | Default        |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | -------------- |
| `ariaDescriptionTranslation` | `aria-description-translation` | a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties. | `string`                                   | `'$selected'`  |
| `ariaLabelToggleButton`      | `aria-label-toggle-button`     | (optional) aria-label attribute needed for icon-only buttons                                                                                           | `string`                                   | `undefined`    |
| `ariaLangDeselected`         | `aria-lang-deselected`         | (optional) translation of 'deselected                                                                                                                  | `string`                                   | `'deselected'` |
| `ariaLangSelected`           | `aria-lang-selected`           | (optional) translation of 'selected                                                                                                                    | `string`                                   | `'selected'`   |
| `background`                 | `background`                   | (optional) Button background                                                                                                                           | `"grey" \| "white"`                        | `'white'`      |
| `colorScheme`                | `color-scheme`                 | <span style="color:red">**[DEPRECATED]**</span> - variant should replace colorScheme<br/><br/>                                                         | `"color" \| "monochrome"`                  | `'color'`      |
| `disabled`                   | `disabled`                     | (optional) If `true`, the button is disabled                                                                                                           | `boolean`                                  | `false`        |
| `hideBorder`                 | `hide-border`                  | (optional) set the border-radius left, right or both                                                                                                   | `boolean`                                  | `undefined`    |
| `iconOnly`                   | `icon-only`                    | (optional) Button type                                                                                                                                 | `boolean`                                  | `false`        |
| `iconPosition`               | `icon-position`                | (optional) Icon position related to the label                                                                                                          | `"after" \| "before"`                      | `'before'`     |
| `position`                   | `position`                     | (optional) position within group                                                                                                                       | `number`                                   | `undefined`    |
| `radius`                     | `radius`                       | (optional) set the border-radius left, right or both                                                                                                   | `"both" \| "left" \| "neither" \| "right"` | `null`         |
| `selected`                   | `selected`                     | (optional) If `true`, the button is selected                                                                                                           | `boolean`                                  | `false`        |
| `size`                       | `size`                         | (optional) The size of the button                                                                                                                      | `"large" \| "regular" \| "small" \| "xs"`  | `'regular'`    |
| `styles`                     | `styles`                       | (optional) Injected CSS styles                                                                                                                         | `string`                                   | `undefined`    |
| `toggleButtonId`             | `toggle-button-id`             | (optional) toggle button's id                                                                                                                          | `string`                                   | `undefined`    |
| `variant`                    | `variant`                      | (optional) background variant of a selected toggle-button                                                                                              | `"color" \| "monochrome"`                  | `'color'`      |


## Events

| Event         | Description                    | Type                                              |
| ------------- | ------------------------------ | ------------------------------------------------- |
| `scale-click` | Emitted when button is clicked | `CustomEvent<{ id: string; selected: boolean; }>` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
