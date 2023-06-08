# scale-slider



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                                                                                                                          | Type                  | Default          |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ---------------- |
| `customColor`        | `custom-color`          | <span style="color:red">**[DEPRECATED]**</span> (optional) slider custom color<br/><br/>                                                                                             | `string`              | `undefined`      |
| `decimals`           | `decimals`              | (optional) number of decimal places                                                                                                                                                  | `0 \| 1 \| 2`         | `0`              |
| `disabled`           | `disabled`              | (optional) disabled                                                                                                                                                                  | `boolean`             | `false`          |
| `helperText`         | `helper-text`           | (optional) helper text                                                                                                                                                               | `string`              | `undefined`      |
| `innerAriaValueText` | `inner-aria-value-text` | (optional) Aria label for range slider                                                                                                                                               | `string`              | `'$from to $to'` |
| `label`              | `label`                 | (optional) slider label                                                                                                                                                              | `string`              | `undefined`      |
| `max`                | `max`                   | (optional) the maximal value of the slider                                                                                                                                           | `number`              | `100`            |
| `min`                | `min`                   | t(optional) he minimal value of the slider                                                                                                                                           | `number`              | `0`              |
| `name`               | `name`                  | (optional) the name of the slider                                                                                                                                                    | `string`              | `undefined`      |
| `platform`           | `platform`              | (optional) adapt styles for a specific platform. Ideally done via a global `data-platform` attribute (e.g. data-platform="ios" on `body`) but browser support is not yet sufficient. | `"android" \| "ios"`  | `undefined`      |
| `range`              | `range`                 | (optional) multi-thumb                                                                                                                                                               | `boolean`             | `false`          |
| `showStepMarks`      | `show-step-marks`       | (optional) show a mark for each step                                                                                                                                                 | `boolean`             | `false`          |
| `showValue`          | `show-value`            | (optional) slider display value                                                                                                                                                      | `boolean`             | `true`           |
| `sliderId`           | `slider-id`             | (optional) Slider id                                                                                                                                                                 | `string`              | `undefined`      |
| `step`               | `step`                  | (optional) the step size to increase or decrease when dragging slider                                                                                                                | `number`              | `1`              |
| `styles`             | `styles`                | (optional) Injected CSS styles                                                                                                                                                       | `string`              | `undefined`      |
| `thumbLarge`         | `thumb-large`           | <span style="color:red">**[DEPRECATED]**</span> (optional) larger thumb<br/><br/>                                                                                                    | `boolean`             | `undefined`      |
| `trackSmall`         | `track-small`           | <span style="color:red">**[DEPRECATED]**</span> (optional) smaller track<br/><br/>                                                                                                   | `boolean`             | `undefined`      |
| `unit`               | `unit`                  | (optional) slider value unit                                                                                                                                                         | `string`              | `''`             |
| `unitPosition`       | `unit-position`         | (optional) unit position                                                                                                                                                             | `"after" \| "before"` | `'after'`        |
| `value`              | `value`                 | (optional) the value of the slider                                                                                                                                                   | `number`              | `0`              |
| `valueFrom`          | `value-from`            | (optional) when `range` is true, the "from" value                                                                                                                                    | `number`              | `0`              |
| `valueTo`            | `value-to`              | (optional) when `range` is true, the "to" value                                                                                                                                      | `number`              | `0`              |


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
| `"from"`          |             |
| `"helper-text"`   |             |
| `"inner-track"`   |             |
| `"label"`         |             |
| `"label-wrapper"` |             |
| `"meta"`          |             |
| `"step-mark"`     |             |
| `"step-marks"`    |             |
| `"thumb-wrapper"` |             |
| `"to"`            |             |
| `"track"`         |             |
| `"track-wrapper"` |             |
| `"value-text"`    |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
