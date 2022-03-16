# scale-slider



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                               | Type          | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------- | ------------- | ----------- |
| `customColor` | `custom-color` | <span style="color:red">**[DEPRECATED]**</span> - optional) slider custom color<br/><br/> | `string`      | `undefined` |
| `decimals`    | `decimals`     | (optional) number of decimal places                                                       | `0 \| 1 \| 2` | `0`         |
| `disabled`    | `disabled`     | (optional) disabled                                                                       | `boolean`     | `false`     |
| `label`       | `label`        | (optional) slider label                                                                   | `string`      | `undefined` |
| `max`         | `max`          | (optional) the maximal value of the slider                                                | `number`      | `100`       |
| `min`         | `min`          | t(optional) he minimal value of the slider                                                | `number`      | `0`         |
| `name`        | `name`         | (optional) the name of the slider                                                         | `string`      | `undefined` |
| `showValue`   | `show-value`   | (optional) slider display value                                                           | `boolean`     | `true`      |
| `sliderId`    | `slider-id`    | (optional) Slider id                                                                      | `string`      | `undefined` |
| `step`        | `step`         | (optional) the step size to increase or decrease when dragging slider                     | `number`      | `1`         |
| `styles`      | `styles`       | (optional) Injected CSS styles                                                            | `string`      | `undefined` |
| `thumbLarge`  | `thumb-large`  | (optional) larger thumb                                                                   | `boolean`     | `false`     |
| `trackSmall`  | `track-small`  | (optional) smaller track                                                                  | `boolean`     | `false`     |
| `unit`        | `unit`         | (optional) slider value unit                                                              | `string`      | `'%'`       |
| `value`       | `value`        | (optional) the display value of the slider                                                | `number`      | `undefined` |


## Events

| Event          | Description                                                                                        | Type                  |
| -------------- | -------------------------------------------------------------------------------------------------- | --------------------- |
| `scale-change` |                                                                                                    | `CustomEvent<number>` |
| `scale-input`  |                                                                                                    | `CustomEvent<number>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<number>` |
| `scaleInput`   | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<number>` |


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
