# scale-tab-header



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                           | Type                 | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `disabled` | `disabled` | True for a disabled Tabnavigation                                                     | `boolean`            | `false`     |
| `selected` | `selected` | (optional) Whether the tab is selected                                                | `boolean`            | `undefined` |
| `size`     | `size`     | (optional) size                                                                       | `"large" \| "small"` | `'small'`   |
| `small`    | `small`    | <span style="color:red">**[DEPRECATED]**</span> - size should replace small<br/><br/> | `boolean`            | `false`     |
| `styles`   | `styles`   | (optional) Injected CSS styles                                                        | `string`             | `undefined` |


## Events

| Event                | Description                                      | Type               |
| -------------------- | ------------------------------------------------ | ------------------ |
| `scale-got-disabled` | Emitted when currently selected tab got disabled | `CustomEvent<any>` |
| `scale-select`       | Emitted on header select                         | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
