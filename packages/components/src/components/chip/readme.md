# scale-chip



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                    | Type                        | Default        |
| ------------------ | -------------------- | ------------------------------ | --------------------------- | -------------- |
| `ariaCheckedState` | `aria-checked-state` | (optional) chip aria-checked   | `boolean`                   | `undefined`    |
| `ariaRoleTitle`    | `aria-role-title`    | (optional) chip aria-role      | `string`                    | `undefined`    |
| `disabled`         | `disabled`           | (optional) chip disabled       | `boolean`                   | `false`        |
| `dismissText`      | `dismiss-text`       | (optional) Dismiss label       | `string`                    | `'dismiss'`    |
| `label`            | `label`              | (optional) chip label          | `string`                    | `undefined`    |
| `selected`         | `selected`           | (optional)                     | `boolean`                   | `false`        |
| `styles`           | `styles`             | (optional) Injected CSS styles | `string`                    | `undefined`    |
| `type`             | `type`               | (optional)                     | `"dynamic" \| "persistent"` | `'persistent'` |
| `variant`          | `variant`            | (optional)                     | `"outline" \| "standard"`   | `'standard'`   |


## Events

| Event          | Description                                                                                        | Type                      |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| `scale-change` | (optional) Change icon click event                                                                 | `CustomEvent<MouseEvent>` |
| `scale-close`  | (optional) Close icon click event                                                                  | `CustomEvent<MouseEvent>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<MouseEvent>` |
| `scaleClose`   | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<MouseEvent>` |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"button-dismissable"` |             |


## Dependencies

### Depends on

- [scale-icon-action-close](../icons/action-close)
- [scale-icon-action-checkmark](../icons/action-checkmark)

### Graph
```mermaid
graph TD;
  scale-chip --> scale-icon-action-close
  scale-chip --> scale-icon-action-checkmark
  style scale-chip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
