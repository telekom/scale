# scale-tooltip



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                   | Type                                                                                                                                                                 | Default         |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `content`   | `content`   | The tooltip's content. Alternatively, you can use the content slot.                                                                                                                                                                           | `string`                                                                                                                                                             | `''`            |
| `disabled`  | `disabled`  | Set to true to disable the tooltip so it won't show when triggered.                                                                                                                                                                           | `boolean`                                                                                                                                                            | `false`         |
| `distance`  | `distance`  | The distance in pixels from which to offset the tooltip away from its target.                                                                                                                                                                 | `number`                                                                                                                                                             | `10`            |
| `open`      | `open`      | Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods.                                                                                                                                              | `boolean`                                                                                                                                                            | `false`         |
| `placement` | `placement` | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport.                                                                                                         | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`         |
| `skidding`  | `skidding`  | The distance in pixels from which to offset the tooltip along its target.                                                                                                                                                                     | `number`                                                                                                                                                             | `0`             |
| `trigger`   | `trigger`   | Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple options can be passed by separating them with a space. When manual is used, the tooltip must be activated programmatically. | `string`                                                                                                                                                             | `'hover focus'` |


## Events

| Event           | Description                                                                                                  | Type               |
| --------------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| `sl-after-hide` | Emitted after the tooltip has hidden and all transitions are complete.                                       | `CustomEvent<any>` |
| `sl-aftershow`  | Emitted after the tooltip has shown and all transitions are complete.                                        | `CustomEvent<any>` |
| `sl-hide`       | Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden. | `CustomEvent<any>` |
| `sl-show`       | Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown.  | `CustomEvent<any>` |


## Methods

### `hide() => Promise<void>`

Shows the tooltip.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Shows the tooltip.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                      |
| ----------- | -------------------------------------------------------------------------------- |
|             | The tooltip's target element. Only the first element will be used as the target. |
| `"content"` | The tooltip's content. Alternatively, you can use the content prop.              |


## Shadow Parts

| Part     | Description                   |
| -------- | ----------------------------- |
| `"base"` | The component's base wrapper. |


## CSS Custom Properties

| Name                     | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `--hide-delay`           | The amount of time to wait before hiding the tooltip.        |
| `--hide-duration`        | The amount of time the hide transition takes to complete.    |
| `--hide-timing-function` | The timing function (easing) to use for the hide transition. |
| `--max-width`            | The maximum width of the tooltip.                            |
| `--show-delay`           | The amount of time to wait before showing the tooltip.       |
| `--show-duration`        | The amount of time the show transition takes to complete.    |
| `--show-timing-function` | The timing function (easing) to use for the show transition. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
