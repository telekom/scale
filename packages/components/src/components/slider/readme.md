# scale-slider



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                           | Type          | Default     |
| ------------- | -------------- | --------------------------------------------------------------------- | ------------- | ----------- |
| `customColor` | `custom-color` | (optional) slider custom color                                        | `string`      | `''`        |
| `decimals`    | `decimals`     | (optional) number of decimal places                                   | `0 \| 1 \| 2` | `0`         |
| `disabled`    | `disabled`     | (optional) disabled                                                   | `boolean`     | `false`     |
| `label`       | `label`        | (optional) slider label                                               | `string`      | `undefined` |
| `max`         | `max`          | (optional) the maximal value of the slider                            | `number`      | `100`       |
| `min`         | `min`          | t(optional) he minimal value of the slider                            | `number`      | `0`         |
| `showValue`   | `show-value`   | (optional) slider display value                                       | `boolean`     | `true`      |
| `sliderId`    | `slider-id`    | (optional) Slider id                                                  | `string`      | `undefined` |
| `step`        | `step`         | (optional) the step size to increase or decrease when dragging slider | `number`      | `1`         |
| `styles`      | `styles`       | (optional) Injected CSS styles                                        | `string`      | `undefined` |
| `thumbLarge`  | `thumb-large`  | (optional) larger thumb                                               | `boolean`     | `false`     |
| `trackSmall`  | `track-small`  | (optional) smaller track                                              | `boolean`     | `false`     |
| `unit`        | `unit`         | (optional) slider value unit                                          | `string`      | `'%'`       |
| `value`       | `value`        | (optional) the display value of the slider                            | `number`      | `undefined` |


## Events

| Event         | Description | Type                  |
| ------------- | ----------- | --------------------- |
| `scaleChange` |             | `CustomEvent<number>` |
| `scaleInput`  |             | `CustomEvent<number>` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"bar"`           |             |
| `"display-value"` |             |
| `"label"`         |             |
| `"thumb"`         |             |
| `"thumb-wrapper"` |             |
| `"track"`         |             |
| `"track-wrapper"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
