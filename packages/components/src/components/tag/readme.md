# scale-tag



<!-- Auto Generated Below -->


## Usage

### Tag

### Default

<scale-tag>
  Label
</scale-tag>

### Pill

<scale-tag pill>
  Label
</scale-tag>

### Link

<scale-tag href="http://example.com">
  Label
</scale-tag>



## Properties

| Property      | Attribute      | Description                    | Type          | Default     |
| ------------- | -------------- | ------------------------------ | ------------- | ----------- |
| `disabled`    | `disabled`     | (optional) Tag disabled        | `boolean`     | `false`     |
| `dismissText` | `dismiss-text` | (optional) Dismiss label       | `string`      | `'dismiss'` |
| `dismissable` | `dismissable`  | (optional) Tag dismissable     | `boolean`     | `false`     |
| `href`        | `href`         | (optional) Tag href            | `string`      | `''`        |
| `size`        | `size`         | (optional) Tag size            | `"small"`     | `undefined` |
| `styles`      | `styles`       | (optional) Injected CSS styles | `string`      | `undefined` |
| `target`      | `target`       | (optional) Tag target          | `string`      | `'_self'`   |
| `variant`     | `variant`      | (optional) Tag variant         | `"secondary"` | `undefined` |


## Events

| Event        | Description                       | Type                      |
| ------------ | --------------------------------- | ------------------------- |
| `scaleClose` | (optional) Close icon click event | `CustomEvent<MouseEvent>` |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"button-dismissable"` |             |
| `"icon-dismissable"`   |             |


## Dependencies

### Used by

 - [scale-data-grid](../data-grid)

### Depends on

- [scale-icon-action-close](../icons/action-close)

### Graph
```mermaid
graph TD;
  scale-tag --> scale-icon-action-close
  scale-data-grid --> scale-tag
  style scale-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
