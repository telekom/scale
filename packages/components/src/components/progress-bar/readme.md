# scale-progress-bar



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                     | Type      | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------- | --------- | ----------- |
| `busy`              | `busy`               | (optional) Progress bar busy switch                                                             | `boolean` | `false`     |
| `customColor`       | `custom-color`       | <span style="color:red">**[DEPRECATED]**</span> - (optional) Progress bar customColor<br/><br/> | `string`  | `undefined` |
| `disabled`          | `disabled`           | (optional) Progress bar disabled                                                                | `boolean` | `undefined` |
| `hasError`          | `has-error`          | (optional) Progress bar error                                                                   | `boolean` | `undefined` |
| `icon`              | `icon`               | (optional) Progress bar icon indicator                                                          | `string`  | `undefined` |
| `label`             | `label`              | (optional) Progress bar label                                                                   | `string`  | `undefined` |
| `mute`              | `mute`               | (optional) disables aria-live                                                                   | `boolean` | `undefined` |
| `percentage`        | `percentage`         | (required) Progress bar percentage                                                              | `number`  | `0`         |
| `progressBarId`     | `progress-bar-id`    | (optional) Progress bar id                                                                      | `string`  | `undefined` |
| `showStatus`        | `show-status`        | (optional) Progress bar percentage text                                                         | `boolean` | `undefined` |
| `statusDescription` | `status-description` | (optional) Progress bar status description text                                                 | `string`  | `undefined` |
| `statusInside`      | `status-inside`      | (optional) Progress text display inside bar                                                     | `boolean` | `undefined` |
| `strokeWidth`       | `stroke-width`       | (optional) Progress bar stroke width                                                            | `number`  | `6`         |
| `styles`            | `styles`             | (optional) Injected CSS styles                                                                  | `string`  | `undefined` |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"inner"`              |             |
| `"inner-status"`       |             |
| `"label"`              |             |
| `"outer"`              |             |
| `"status"`             |             |
| `"status-description"` |             |
| `"wrapper"`            |             |


## Dependencies

### Used by

 - [scale-data-grid](../data-grid)

### Graph
```mermaid
graph TD;
  scale-data-grid --> scale-progress-bar
  style scale-progress-bar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
