# scale-radio-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                               | Type               | Default     |
| ------------ | ------------- | ----------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `checked`    | `checked`     | (optional) Input checked                                                                  | `boolean`          | `false`     |
| `disabled`   | `disabled`    | (optional) Input disabled                                                                 | `boolean`          | `undefined` |
| `helperText` | `helper-text` | (optional) Input helper text                                                              | `string`           | `''`        |
| `info`       | `info`        | (optional) Input status                                                                   | `boolean`          | `true`      |
| `inputId`    | `input-id`    | (optional) Input checkbox id                                                              | `string`           | `undefined` |
| `invalid`    | `invalid`     | (optional) Input status                                                                   | `boolean`          | `false`     |
| `label`      | `label`       | (optional) Input label                                                                    | `string`           | `''`        |
| `name`       | `name`        | (optional) Input name                                                                     | `string`           | `''`        |
| `status`     | `status`      | <span style="color:red">**[DEPRECATED]**</span> - invalid should replace status<br/><br/> | `string`           | `''`        |
| `styles`     | `styles`      | (optional) Injected CSS styles                                                            | `string`           | `undefined` |
| `success`    | `success`     | (optional) Input status                                                                   | `boolean`          | `false`     |
| `value`      | `value`       | (optional) Input value                                                                    | `number \| string` | `''`        |
| `warning`    | `warning`     | (optional) Input status                                                                   | `boolean`          | `false`     |


## Events

| Event          | Description                                                                                        | Type                                  |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `scale-change` |                                                                                                    | `CustomEvent<InputChangeEventDetail>` |
| `scaleChange`  | <span style="color:red">**[DEPRECATED]**</span> in v3 in favor of kebab-case event names<br/><br/> | `CustomEvent<InputChangeEventDetail>` |


## Dependencies

### Depends on

- [scale-icon-alert-information](../icons/alert-information)
- [scale-icon-alert-error](../icons/alert-error)
- [scale-icon-alert-success](../icons/alert-success)

### Graph
```mermaid
graph TD;
  scale-radio-button --> scale-icon-alert-information
  scale-radio-button --> scale-icon-alert-error
  scale-radio-button --> scale-icon-alert-success
  style scale-radio-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
