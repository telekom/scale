# scale-notification



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                               | Type                                                    | Default           |
| ------------------ | -------------------- | --------------------------------------------------------- | ------------------------------------------------------- | ----------------- |
| `ariaHeading`      | `aria-heading`       | (optional) string prepended to the heading                | `string`                                                | `'Information'`   |
| `closeButtonLabel` | `close-button-label` | (optional) Label for close button                         | `string`                                                | `'Close'`         |
| `closeButtonTitle` | `close-button-title` | (optional) `title` for close button                       | `string`                                                | `'Close'`         |
| `delay`            | `delay`              | (optional) Time in milliseconds until it closes by itself | `number`                                                | `undefined`       |
| `dismissible`      | `dismissible`        | (optional) Show the close button                          | `boolean`                                               | `false`           |
| `heading`          | `heading`            | Heading                                                   | `string`                                                | `undefined`       |
| `headingLevel`     | `heading-level`      | Default aria-level for heading                            | `number`                                                | `2`               |
| `innerAriaLive`    | `inner-aria-live`    | (optional) `aria-live` of element                         | `string`                                                | `'assertive'`     |
| `opened`           | `opened`             | (optional) Visible                                        | `boolean`                                               | `undefined`       |
| `styles`           | `styles`             | (optional) Injected styles                                | `string`                                                | `undefined`       |
| `type`             | `type`               | (optional) Type                                           | `"banner" \| "inline" \| "toast"`                       | `'inline'`        |
| `variant`          | `variant`            | (optional) Variant                                        | `"danger" \| "informational" \| "success" \| "warning"` | `'informational'` |


## Events

| Event                | Description                                                                                        | Type                                  |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `scale-before-close` | Fires on every close attempt. Calling `event.preventDefault()` will prevent the modal from closing | `CustomEvent<BeforeCloseEventDetail>` |
| `scale-close`        | Fires after the notification has been closed                                                       | `CustomEvent<void>`                   |
| `scale-open`         | Fires after the notification has been opened                                                       | `CustomEvent<void>`                   |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"body"`         |             |
| `"close-button"` |             |
| `"heading"`      |             |
| `"icon"`         |             |
| `"text"`         |             |


## Dependencies

### Depends on

- [scale-button](../button)
- [scale-icon-action-circle-close](../icons/action-circle-close)

### Graph
```mermaid
graph TD;
  scale-notification --> scale-button
  scale-notification --> scale-icon-action-circle-close
  style scale-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
