# scale-data-grid

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                  | Type       | Default     |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `fields`         | `fields`          | Input fields config array                                                                    | `any`      | `undefined` |
| `freezeHeader`   | `freeze-header`   | (optional) Freeze header row from scrolling                                                  | `boolean`  | `false`     |
| `heading`        | `heading`         | (optional) Heading string                                                                    | `string`   | `''`        |
| `height`         | `height`          | (optional) Set static table height, by default will auto-resize                              | `string`   | `undefined` |
| `hideBorder`     | `hide-border`     | (optional) Set to true to remove border                                                      | `boolean`  | `false`     |
| `hideHeader`     | `hide-header`     | (optional) Set to true to hide header row                                                    | `boolean`  | `false`     |
| `hideInfo`       | `hide-info`       | (optional) Set to true to remove info footer block including pagination and selection status | `boolean`  | `false`     |
| `hideMenu`       | `hide-menu`       | (optional) Set to true to hide settings menu                                                 | `boolean`  | `false`     |
| `numbered`       | `numbered`        | (optional) Set to true to add numbers column                                                 | `boolean`  | `false`     |
| `pageSize`       | `page-size`       | (optional) Set number of rows to display per pagination page                                 | `number`   | `Infinity`  |
| `rows`           | `rows`            | Input data array                                                                             | `any`      | `undefined` |
| `selectable`     | `selectable`      | (optional) Set to true to add selection column                                               | `boolean`  | `false`     |
| `selection`      | --                | Read-only selection array - populated with raw data from selected rows                       | `string[]` | `[]`        |
| `shadeAlternate` | `shade-alternate` | (optional) Shade every second row darker                                                     | `boolean`  | `true`      |
| `styles`         | `styles`          | (optional) Injected css styles                                                               | `any`      | `undefined` |
| `visible`        | `visible`         | (optional) Set to false to hide table, used for nested tables to re-render upon toggle       | `boolean`  | `true`      |


## Events

| Event        | Description                                                                                        | Type                                     |
| ------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `scale-edit` | Event triggered every time the editable cells are changed, updating the original rows data         | `CustomEvent<DataGridEditEventDetail>`   |
| `scale-sort` | Event triggered every time the data is sorted, changing original rows data                         | `CustomEvent<DataGridSortedEventDetail>` |
| `scaleEdit`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<DataGridEditEventDetail>`   |
| `scaleSort`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<DataGridSortedEventDetail>` |


## Dependencies

### Depends on

- [scale-menu-flyout](../menu-flyout)
- [scale-button](../button)
- [scale-icon-service-settings](../icons/service-settings)
- [scale-menu-flyout-list](../menu-flyout-list)
- [scale-menu-flyout-item](../menu-flyout-item)
- [scale-icon-action-sort](../icons/action-sort)
- [scale-icon-navigation-collapse-up](../icons/navigation-collapse-up)
- [scale-icon-navigation-collapse-down](../icons/navigation-collapse-down)
- [scale-icon-action-hide-password](../icons/action-hide-password)
- [scale-icon](../icon)
- [scale-checkbox](../checkbox)
- [scale-pagination](../pagination)
- [scale-switch](../switch)
- [scale-link](../link)
- [scale-progress-bar](../progress-bar)
- [scale-text-field](../text-field)
- [scale-dropdown](../dropdown)
- [scale-tag](../tag)

### Graph
```mermaid
graph TD;
  scale-data-grid --> scale-menu-flyout
  scale-data-grid --> scale-button
  scale-data-grid --> scale-icon-service-settings
  scale-data-grid --> scale-menu-flyout-list
  scale-data-grid --> scale-menu-flyout-item
  scale-data-grid --> scale-icon-action-sort
  scale-data-grid --> scale-icon-navigation-collapse-up
  scale-data-grid --> scale-icon-navigation-collapse-down
  scale-data-grid --> scale-icon-action-hide-password
  scale-data-grid --> scale-icon
  scale-data-grid --> scale-checkbox
  scale-data-grid --> scale-pagination
  scale-data-grid --> scale-switch
  scale-data-grid --> scale-link
  scale-data-grid --> scale-progress-bar
  scale-data-grid --> scale-text-field
  scale-data-grid --> scale-dropdown
  scale-data-grid --> scale-tag
  scale-menu-flyout-item --> scale-icon-action-success
  scale-menu-flyout-item --> scale-icon-navigation-right
  scale-checkbox --> scale-icon-action-indeterminate
  scale-checkbox --> scale-icon-action-success
  scale-checkbox --> scale-icon-alert-information
  scale-checkbox --> scale-icon-alert-error
  scale-switch --> scale-icon-action-success
  scale-text-field --> scale-icon-alert-information
  scale-text-field --> scale-icon-alert-error
  scale-text-field --> scale-icon-alert-success
  scale-dropdown --> scale-icon-alert-information
  scale-dropdown --> scale-icon-alert-error
  scale-dropdown --> scale-icon-alert-success
  scale-dropdown --> scale-icon-navigation-collapse-down
  scale-tag --> scale-icon-action-close
  style scale-data-grid fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
