# scale-segmented-button



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                                                                                                            | Type                               | Default            |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------------------ |
| `adjacentSiblings`           | `adjacent-siblings`            |                                                                                                                                                        | `"left" \| "leftright" \| "right"` | `undefined`        |
| `ariaDescriptionTranslation` | `aria-description-translation` | a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties. | `string`                           | `'$selected'`      |
| `ariaLabelSegment`           | `aria-label-segment`           | (optional) aria-label attribute needed for icon-only segments                                                                                          | `string`                           | `undefined`        |
| `ariaLangDeselected`         | `aria-lang-deselected`         | (optional) translation of 'deselected                                                                                                                  | `string`                           | `'deselected'`     |
| `ariaLangSelected`           | `aria-lang-selected`           | (optional) translation of 'selected                                                                                                                    | `string`                           | `'selected'`       |
| `disabled`                   | `disabled`                     | (optional) If `true`, the segment is disabled                                                                                                          | `boolean`                          | `false`            |
| `hasIcon`                    | `has-icon`                     | (optional) position within group                                                                                                                       | `boolean`                          | `undefined`        |
| `iconOnly`                   | `icon-only`                    | (optional) position within group                                                                                                                       | `boolean`                          | `undefined`        |
| `position`                   | `position`                     | (optional) position within group                                                                                                                       | `number`                           | `undefined`        |
| `segmentId`                  | `segment-id`                   | (optional) segment's id                                                                                                                                | `string`                           | `'segment-' + i++` |
| `selected`                   | `selected`                     | (optional) If `true`, the segment is selected                                                                                                          | `boolean`                          | `false`            |
| `selectedIndex`              | `selected-index`               | (optional) the index of the currently selected segment in the segmented-button                                                                         | `number`                           | `undefined`        |
| `size`                       | `size`                         | (optional) The size of the segment                                                                                                                     | `"large" \| "medium" \| "small"`   | `'small'`          |
| `styles`                     | `styles`                       | (optional) Injected CSS styles                                                                                                                         | `string`                           | `undefined`        |
| `textOnly`                   | `text-only`                    | (optional) position within group                                                                                                                       | `boolean`                          | `undefined`        |
| `width`                      | `width`                        | (optional) Segment width set to ensure that all segments have the same width                                                                           | `string`                           | `undefined`        |


## Events

| Event         | Description                    | Type                                                                         |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `scale-click` | Emitted when button is clicked | `CustomEvent<{ id: string; selected: boolean; userInteraction?: boolean; }>` |


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
