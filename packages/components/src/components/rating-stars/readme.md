# scale-rating-stars



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                                                                                                           | Type                 | Default                       |
| ---------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------- |
| `ariaLabelTranslation` | `aria-label-translation` | a11y text for getting meaningful value. `$rating` and `$max` (deprecated `$maxRating`) are template variables and will be replaces by their corresponding properties. | `string`             | `'$rating out of $max stars'` |
| `disabled`             | `disabled`               | disables input                                                                                                                                                        | `boolean`            | `false`                       |
| `hideLabel`            | `hide-label`             | (optional) info text                                                                                                                                                  | `boolean`            | `false`                       |
| `infoText`             | `info-text`              | (optional) info text                                                                                                                                                  | `string`             | `undefined`                   |
| `label`                | `label`                  | (optional) rating label                                                                                                                                               | `string`             | `'Rating'`                    |
| `max`                  | `max`                    | The upper limit of the rating                                                                                                                                         | `number`             | `5`                           |
| `maxRating`            | `max-rating`             | Deprecated; max should be used instead of maxRating                                                                                                                   | `number`             | `5`                           |
| `minRating`            | `min-rating`             | Deprecated; The lower limit of the rating                                                                                                                             | `number`             | `0`                           |
| `rating`               | `rating`                 | Represents the current value of the rating                                                                                                                            | `number`             | `0`                           |
| `readonly`             | `readonly`               | makes the rating non-interactive (but still accessible)                                                                                                               | `boolean`            | `false`                       |
| `size`                 | `size`                   | size of the stars                                                                                                                                                     | `"large" \| "small"` | `'large'`                     |
| `starSize`             | `star-size`              | Deprecated; size should be used instead of starSize                                                                                                                   | `"large" \| "small"` | `'large'`                     |


## Events

| Event          | Description                                                                                        | Type               |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `scale-change` | Emitted when the rating has changed                                                                | `CustomEvent<any>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<any>` |


## Shadow Parts

| Part                 | Description |
| -------------------- | ----------- |
| `"container"`        |             |
| `"content"`          |             |
| `"infotext"`         |             |
| `"label"`            |             |
| `"placeholder-star"` |             |
| `"range-slider"`     |             |
| `"selected-star"`    |             |
| `"star"`             |             |
| `"wrapper"`          |             |


## Dependencies

### Depends on

- [scale-icon-action-favorite](../icons/action-favorite)

### Graph
```mermaid
graph TD;
  scale-rating-stars --> scale-icon-action-favorite
  style scale-rating-stars fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
