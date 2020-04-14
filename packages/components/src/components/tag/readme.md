# scale-tag



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                    | Type                                     | Default     |
| ------------- | -------------- | ------------------------------ | ---------------------------------------- | ----------- |
| `customClass` | `custom-class` | (optional) Tag class           | `string`                                 | `''`        |
| `dismissable` | `dismissable`  | (optional) Tag target          | `boolean`                                | `false`     |
| `link`        | `link`         | (optional) Tag link            | `string`                                 | `''`        |
| `size`        | `size`         | (optional) Tag size            | `string`                                 | `''`        |
| `styles`      | --             | (optional) Injected jss styles | `StyleSheet<string \| number \| symbol>` | `undefined` |
| `target`      | `target`       | (optional) Tag target          | `string`                                 | `'_self'`   |
| `variant`     | `variant`      | (optional) Tag variant         | `string`                                 | `''`        |


## Events

| Event   | Description | Type               |
| ------- | ----------- | ------------------ |
| `close` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [scale-icon](../icon)

### Graph
```mermaid
graph TD;
  scale-tag --> scale-icon
  style scale-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
