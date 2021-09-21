# scale-menu-flyout-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                   | Type      | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------- | --------- | ----------- |
| `active`   | `active`   | (optional) Used by cascading menus to set when open                           | `boolean` | `false`     |
| `cascade`  | `cascade`  | (optional) Set to true to display arrow icon suffix                           | `boolean` | `false`     |
| `checked`  | `checked`  | (optional) Set to true to display check prefix, false to display empty prefix | `any`     | `undefined` |
| `disabled` | `disabled` | (optional) Disabled                                                           | `boolean` | `false`     |
| `styles`   | `styles`   | (optional) Injected styles                                                    | `string`  | `undefined` |
| `value`    | `value`    | (optional) value                                                              | `string`  | `undefined` |


## Events

| Event          | Description                                                                                        | Type                                  |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `scale-select` | Event triggered when menu item selected                                                            | `CustomEvent<{ item: HTMLElement; }>` |
| `scaleSelect`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<{ item: HTMLElement; }>` |


## Methods

### `triggerEvent(eventType: 'keydown' | 'click', key?: 'Enter' | ' ' | 'ArrowRight') => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"base"`   |             |
| `"label"`  |             |
| `"prefix"` |             |
| `"suffix"` |             |


## Dependencies

### Depends on

- [scale-icon-action-success](../icons/action-success)
- [scale-icon-navigation-right](../icons/navigation-right)

### Graph
```mermaid
graph TD;
  scale-menu-flyout-item2 --> scale-icon-action-success
  scale-menu-flyout-item2 --> scale-icon-navigation-right
  style scale-menu-flyout-item2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
