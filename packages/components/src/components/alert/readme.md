# t-alert



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description              | Type                | Default     |
| ------------- | -------------- | ------------------------ | ------------------- | ----------- |
| `close`       | `close`        | (required) Alert close   | `string`            | `''`        |
| `customClass` | `custom-class` | (required) Alert class   | `string`            | `''`        |
| `headline`    | `headline`     | (optional) Alert title   | `string`            | `undefined` |
| `icon`        | `icon`         | (optional) Alert icon    | `string`            | `''`        |
| `opened`      | `opened`       | (required) Alert opened  | `boolean`           | `undefined` |
| `size`        | `size`         | (optional) Alert size    | `string`            | `''`        |
| `theme`       | `theme`        | (optional) Alert theme   | `string`            | `''`        |
| `timeout`     | `timeout`      | (optional) Alert timeout | `boolean \| number` | `false`     |
| `variant`     | `variant`      | (optional) Alert variant | `string`            | `''`        |


## Methods

### `open() => Promise<void>`

(required) Alert method: open()

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                                   | Description                                      |
| -------------------------------------- | ------------------------------------------------ |
| `--alert-background`                   | Background color of the alert                    |
| `--alert-close-height`                 | Height of the close icon of the alert            |
| `--alert-close-hover-opacity`          | Hover opacity of the close icon of the alert     |
| `--alert-close-opacity`                | Opacity of the close icon of the alert           |
| `--alert-close-width`                  | Width of the close icon of the alert             |
| `--alert-color`                        | Color of the text of the alert                   |
| `--alert-headline-color`               | Color of the headline of the alert               |
| `--alert-headline-font-size`           | Font size of the headline of the alert           |
| `--alert-headline-margin`              | Margin of the headline of the alert              |
| `--alert-icon-background`              | Background color of the icon of the alert        |
| `--alert-icon-border-radius`           | Border radius of the icon of the alert           |
| `--alert-icon-height`                  | Height of the icon of the alert                  |
| `--alert-icon-margin`                  | Margin of the icon of the alert                  |
| `--alert-icon-width`                   | Width of the icon of the alert                   |
| `--alert-padding`                      | Padding of the alert                             |
| `--alert-variant-danger-background`    | Background color of the variant danger alert     |
| `--alert-variant-danger-color`         | Color of the text of the variant danger alert    |
| `--alert-variant-info-background`      | Background color of the variant info alert       |
| `--alert-variant-info-color`           | Color of the text of the variant info alert      |
| `--alert-variant-primary-background`   | Background color of the variant primary alert    |
| `--alert-variant-primary-color`        | Color of the text the variant primary alert      |
| `--alert-variant-secondary-background` | Background color of the variant secondary alert  |
| `--alert-variant-secondary-color`      | Color of the text of the variant secondary alert |
| `--alert-variant-success-background`   | Background color of the variant success alert    |
| `--alert-variant-success-color`        | Color of the text of the variant success alert   |
| `--alert-variant-warning-background`   | Background color of the variant warning alert    |
| `--alert-variant-warning-color`        | Color of the text of the variant warning alert   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
