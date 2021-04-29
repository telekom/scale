<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Slider</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A slider lets users control a value or a range of values.

## General

A slider displays the current value or range of values by default. Users can increase or decrease the value or range of values by moving a handle along a bar. Using a slider usually triggers an immediate effect (e.g., adjusting a setting like volume or filtering data).

### When to use

Use a slider when:

- users need to quickly adjust a value,
- adjusting the value or range triggers an immediate effect, or
- the input doesn’t have to be precise.

### When not to use

Don't use a slider when:

- users might want to pick a precise value (here an input field is better),
- there is no immediate effect,
- the range is very large (e.g., more than 1-100), or
- the range is very small (e.g., 1-3).

## Basic types

Each slider needs a label which describes the value that is changing. Always display the current value by default.

![Image Name](assets/3_components/slider/slider_types.png)

## Colors

Telekom sliders use Magenta as an accent color. If you need to apply a color code, you can either use colors from the Telekom color palette or create a custom one. When customizing, use a color-code scheme that is clear to the user and meets all accessibility requirements.

![Image Name](assets/3_components/slider/slider_color.png)

## Sizes

![Image Name](assets/3_components/slider/slider_sizes.png)

## Inactive slider

Disable the slider if:

- another action has to take place before the slider is usable or
- users cannot change the value at the moment.

![Image Name](assets/3_components/slider/slider_disabled.png)

## Related components

<a href="?path=/usage/components-text-field--standard">Text Field</a>
