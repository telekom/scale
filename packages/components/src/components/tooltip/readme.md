# scale-tooltip



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                              | Type                                                                                                                                                                 | Default         |
| -------------- | --------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `arrowOffset`  | `arrow-offset`  | (optional) How much of the arrow element is "hidden"                                     | `number`                                                                                                                                                             | `-4`            |
| `arrowPadding` | `arrow-padding` | (optional) Padding between the arrow and the edges of the tooltip                        | `number`                                                                                                                                                             | `8`             |
| `content`      | `content`       | (optional) The content of the Tooltip, supporting text only                              | `string`                                                                                                                                                             | `''`            |
| `disabled`     | `disabled`      | (optional) Disable the tooltip                                                           | `boolean`                                                                                                                                                            | `false`         |
| `distance`     | `distance`      | (optional) Tooltip distance from the target element (related to `placement`)             | `number`                                                                                                                                                             | `10`            |
| `flip`         | `flip`          | (optional) Switching the flip option of the tooltip on and off                           | `boolean`                                                                                                                                                            | `true`          |
| `opened`       | `opened`        | (optional) Set the tooltip to opened by default (will still be closed on closing events) | `boolean`                                                                                                                                                            | `false`         |
| `placement`    | `placement`     | (optional) Position of the Tooltip around the trigger element                            | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`         |
| `styles`       | `styles`        | (optional) Injected CSS styles                                                           | `string`                                                                                                                                                             | `undefined`     |
| `trigger`      | `trigger`       | (optional) Set custom trigger event (hover, focus, click)                                | `string`                                                                                                                                                             | `'hover focus'` |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `scale-before-hide` |             | `CustomEvent<any>` |
| `scale-before-show` |             | `CustomEvent<any>` |
| `scale-hide`        |             | `CustomEvent<any>` |
| `scale-show`        |             | `CustomEvent<any>` |


## Methods

### `hideTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"arrow"`   |             |
| `"trigger"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
