# scale-rating-stars



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                     | Type      | Default                                    |
| ---------------------- | ------------------------ | ------------------------------- | --------- | ------------------------------------------ |
| `ariaLabelTranslation` | `aria-label-translation` | (optional) ariaLabelTranslation | `string`  | ``${this.value} out of ${this.max} stars`` |
| `disabled`             | `disabled`               | (optional) disabled             | `boolean` | `false`                                    |
| `label`                | `label`                  | (optional) slider label         | `string`  | `undefined`                                |
| `max`                  | `max`                    | (optional) max                  | `number`  | `5`                                        |
| `precision`            | `precision`              | (optional) precision            | `number`  | `1`                                        |
| `small`                | `small`                  | (optional) small                | `boolean` | `false`                                    |
| `value`                | `value`                  | (optional) value                | `number`  | `0`                                        |


## Events

| Event               | Description                         | Type                              |
| ------------------- | ----------------------------------- | --------------------------------- |
| `scaleRatingChange` | Emitted when the value has changed. | `CustomEvent<{ value: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
