<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Radio Button</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Radio buttons allow a user to only select one option from a collection of choices.

## General

A radio button is a selection control that consists of a circular button and a label. It is considered to be on with a filled circle and off with an empty circle.

Radio buttons only appear in groups. Activating a radio button automatically deselects the previously selected option.

![Image Name](assets/3_components/radio-button/radiobuttons-general.png)

### When to use

Use radio buttons to provide the user with a collection of related but mutually exclusive choices.

### When not to use

If the user needs to choose one or more options, use checkboxes.
To initiate an action, use a button.

## Elements

![Image Name](assets/3_components/radio-button/radio-button-elements.png)

### Radio button deselected (1)

An empty circle is considered to be deselected.

### Radio button selected (2)

If the circle is filled, the option is considered to be selected.

### Information (3) (Optional)

When necessary, you can also provide additional information to help users.

### Error (4)

If the selection is contradictory or not applicable, an error message appears.

## Label

The label clearly describes the effect of activating the radio button. Labels normally contain at most three words.

![Image Name](assets/3_components/radio-button/radiobuttons-label.png)

## Disabled state

Disable the radio button if:

- another action has to take place before the radio button is usable or
- the option needs to be listed but is currently unavailable.

![Image Name](assets/3_components/radio-button/disabled-radiobutton.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Headline and default selection

Consider using a headline to provide more clarity to the user.

Display one option as a default selection to align with user expectations and reduce the time and clicks needed. This is also a good way of making suggestions to the user. There are a few cases where you don't have to select a radio button by default, e.g., when selecting titles in a form (Mr., Ms., etc.).

![Image Name](assets/3_components/radio-button/radiobuttons-bestpractice.png)

## Related components

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Dropdown ](?path=/usage/components-dropdown--standard)
