# scale-segmented-button



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                                                                                                            | Type                               | Default        |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | -------------- |
| `adjacentSiblings`           | `adjacent-siblings`            |                                                                                                                                                        | `"left" \| "leftright" \| "right"` | `undefined`    |
| `ariaDescriptionTranslation` | `aria-description-translation` | a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties. | `string`                           | `'$selected'`  |
| `ariaLabelSegment`           | `aria-label-segment`           | (optional) aria-label attribute needed for icon-only buttons                                                                                           | `string`                           | `undefined`    |
| `ariaLangDeselected`         | `aria-lang-deselected`         | (optional) translation of 'deselected                                                                                                                  | `string`                           | `'deselected'` |
| `ariaLangSelected`           | `aria-lang-selected`           | (optional) translation of 'selected                                                                                                                    | `string`                           | `'selected'`   |
| `disabled`                   | `disabled`                     | (optional) If `true`, the button is disabled                                                                                                           | `boolean`                          | `false`        |
| `iconOnly`                   | `icon-only`                    | (optional) icon only segment                                                                                                                           | `boolean`                          | `false`        |
| `iconText`                   | `icon-text`                    | (optional) segment with icon and text                                                                                                                  | `boolean`                          | `false`        |
| `multiSelect`                | `multi-select`                 | (optional) multi select segment                                                                                                                        | `boolean`                          | `false`        |
| `position`                   | `position`                     | (optional) position within group                                                                                                                       | `number`                           | `undefined`    |
| `segmentId`                  | `segment-id`                   | (optional) segment's id                                                                                                                                | `string`                           | `undefined`    |
| `selected`                   | `selected`                     | (optional) If `true`, the button is selected                                                                                                           | `boolean`                          | `false`        |
| `size`                       | `size`                         | (optional) The size of the button                                                                                                                      | `"large" \| "medium" \| "small"`   | `'small'`      |
| `styles`                     | `styles`                       | (optional) Injected CSS styles                                                                                                                         | `string`                           | `undefined`    |
| `width`                      | `width`                        | (optional) Button width set to ensure that all buttons have the same width                                                                             | `string`                           | `undefined`    |


## Events

| Event         | Description                                                                                        | Type                                                             |
| ------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `scale-click` | Emitted when button is clicked                                                                     | `CustomEvent<{ id: string; selected: boolean; value: string; }>` |
| `scaleClick`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<{ id: string; selected: boolean; value: string; }>` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [scale-icon-action-checkmark](../icons/action-checkmark)

### Graph
```mermaid
graph TD;
  scale-segment --> scale-icon-action-checkmark
  style scale-segment fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
