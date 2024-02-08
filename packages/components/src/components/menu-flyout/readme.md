# scale-menu



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                             | Type                                                                                | Default          |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------- |
| `closeOnSelect`   | `close-on-select`   | (optional) Determines whether the flyout should close when a menu item is selected      | `boolean`                                                                           | `true`           |
| `direction`       | `direction`         | (optional) Set preference for where the menu appears, space permitting                  | `"bottom-left" \| "bottom-right" \| "left" \| "right" \| "top-left" \| "top-right"` | `'bottom-right'` |
| `styles`          | `styles`            | (optional) Injected styles                                                              | `string`                                                                            | `undefined`      |
| `triggerHasPopup` | `trigger-has-popup` | (optional) Determines whether the flyout trigger should get the aria-haspopup attribute | `boolean`                                                                           | `true`           |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"trigger"` |             |


## Dependencies

### Used by

 - [scale-app-header](../telekom/app-header)
 - [scale-data-grid](../data-grid)
 - [scale-telekom-header-data-back-compat](../telekom/telekom-header-data-back-compat)
 - [scale-telekom-profile-menu](../telekom/telekom-profile-menu)

### Graph
```mermaid
graph TD;
  scale-app-header --> scale-menu-flyout
  scale-data-grid --> scale-menu-flyout
  scale-telekom-header-data-back-compat --> scale-menu-flyout
  scale-telekom-profile-menu --> scale-menu-flyout
  style scale-menu-flyout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
