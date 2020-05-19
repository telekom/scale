# scale-modal



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                            | Type                                     | Default     |
| ------------- | -------------- | -------------------------------------- | ---------------------------------------- | ----------- |
| `customClass` | `custom-class` | (optional) Modal class                 | `string`                                 | `''`        |
| `opened`      | `opened`       | (optional) If true, the Modal is open. | `boolean`                                | `false`     |
| `size`        | `size`         | (optional) Modal size                  | `string`                                 | `'default'` |
| `styles`      | --             | (optional) Injected jss styles         | `StyleSheet<string \| number \| symbol>` | `undefined` |
| `transitions` | `transitions`  | (optional) Transition overrides        | `any`                                    | `undefined` |
| `variant`     | `variant`      | (optional) Modal variant               | `string`                                 | `''`        |


## Events

| Event        | Description                                                         | Type                      |
| ------------ | ------------------------------------------------------------------- | ------------------------- |
| `scaleClose` | (optional) Callback fired when the component requests to be closed. | `CustomEvent<MouseEvent>` |


## Dependencies

### Depends on

- animatable-component

### Graph
```mermaid
graph TD;
  scale-modal --> animatable-component
  style scale-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
