<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Checkbox</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

With Checkboxes, users toggle options on or off. They can answer simple yes-no questions in this way. Furthermore, users can select one or more options from a number of choices.

## General

A checkbox is a selection control that allows users to choose between two states. It consists of a control box and a corresponding label. Activating a checkbox does not affect other selections. It is considered to be selected when the control box has a checkmark. In the initial state, a checkbox can switch on or off.

![Image Name](assets/3_components/checkbox/checkbox.png)

### When to use

There are two main use cases for checkboxes:

- Single: Use a stand-alone checkbox if users are to turn an option on or off. For instance, this could be a request in a form or the agreement of general terms and conditions before buying a product.
- Multiple: Use a number of checkboxes if users are to select one or more options from a list. For instance, this could be a filter panel in a shop, a collection of settings, or a list of items to edit.

### When not to use

- When states are mutually exclusive, use radio buttons instead.

## Checkbox label

The label explicitly describes what happens when users select or deselect a checkbox. It should convey two opposite states. Always formulate the label positively to avoid double negatives.

![Image Name](assets/3_components/checkbox/checkbox_label.png)

## Disabled state

Disable the checkbox if:

- another action has to take place before the checkbox is usable or
- the option needs to be listed but is currently unavailable.

![Image Name](assets/3_components/checkbox/checkbox_disabled.png)

## Nested groups of checkboxes

> Available soon

When checkboxes are related to a parent checkbox, you can nest them. Selecting the parent checkbox automatically selects all checkboxes of the group and vice versa. When the user selects a portion of the nested checkboxes, the state of the parent checkbox is indeterminate.

![Image Name](assets/3_components/checkbox/checkbox_nesting.png)

## Required input

When checking a box is required, use an asterisk (\*) in the text label.

![Image Name](assets/3_components/checkbox/checkbox_required_input.png)

## Related components

<a href="?path=/usage/components-dropdown--standard">Dropdown, </a>
<a href="?path=/usage/components-switch--standard">Switch, </a>
<a href="?path=/usage/components-radio-button--standard">Radio Button</a>
