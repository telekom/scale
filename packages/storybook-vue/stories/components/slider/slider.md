<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Slider</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A slider lets users control a value or a range of values.

## General

A slider displays the current value or range of values by default. Users can increase or decrease the value or range of values by moving a handle along a bar. Using a slider usually triggers an immediate effect (e.g., adjusting a setting like volume or filtering data).

### When to use

Use a slider when:

- the user needs to quickly adjust a value,
- adjusting the value or range triggers an immediate effect, or
- the input doesn’t have to be precise (e.g., for a volume slider, the value can be hidden).

### When not to use

Don’t use a slider when:

- the users might want to pick a precise value (here an input field works better),
- there is no immediate effect needed/wanted,
- the range is very large (e.g., more than 1-1500), or
- the range is very small (e.g., 1-3).

## Basic types

Each slider needs a label which describes the value that is changing. Always display the current value by default.

### Single value slider

The user can set a precise value (e.g., $200) from the pre-defined range.

The selected value changes in real time as the knob moves.

The increase/decrease is by increments of 1.

![slider_types-value-EN.png](assets/3_components/slider/slider_types-value-EN.png)

### Range slider

The user can control both the starting point and end point of the value range they want to set.

The value increase/decrease from both knobs is by increments of 1.

![slider_types-range-EN.png](assets/3_components/slider/slider_types-range-EN.png)

### Stepped slider

The slider increases and decreases the value by set increments (e.g., increments of 10 instead of 1).

![slider_types-stepped-EN.png](assets/3_components/slider/slider_types-stepped-EN.png)

![slider_types-stepped-range-EN.png](assets/3_components/slider/slider_types-stepped-range-EN.png)

## Variants

### Shown/hidden elements

Current value shown/hidden

![slider_variants-EN.png](assets/3_components/slider/slider_variants-EN.png)

Message shown/hidden
![slider_variants-message-EN.png](assets/3_components/slider/slider_variants-message-EN.png)

### Colors

Telekom sliders use Magenta as an accent color. If you need to apply a custom color, you can either use colors from the <a href="?path=/docs/guidelines-colors--page">Telekom color palette</a> or create a new one. When customizing, use a color-code scheme that is clear to the user and meets all accessibility requirements.

![slider_color-EN.png](assets/3_components/slider/slider_color-EN.png)

### Disabled state

Disable the slider if:

- another action has to take place before the slider is usable or
- users cannot change the value at the moment.

When disabled, remove the knobs to show that the value can’t be changed.

![slider_disabled-EN.png](assets/3_components/slider/slider_disabled-EN.png)

## Elements

![slider-elements-EN.png](assets/3_components/slider/slider-elements-EN.png)

#### Label (1)

The label clearly indicates what kind of value is being adjusted.

#### Value (2) (optional)

Display the selected value either as a single value for the value slider or as a range for the range slider.

#### Knob 1 (3) (for a range slider)

Knob 1 indicates the starting point of the range the user wants to select.

#### Knob 2 (4)

Knob 2 indicates the end point of the range the user wants to select.

#### Message (5) (optional)

Display error or informational messages here.

## Related components

<a href="?path=/usage/components-text-field--standard">Text Field</a>
