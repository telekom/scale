<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Checkbox</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

With checkboxes, users toggle options on or off. They can answer simple yes-no questions in this way. Furthermore, users can select one or more options from a number of choices.

## General

A checkbox is a selection control that allows users to choose between two states. It consists of a control box and a corresponding label. Activating a checkbox does not affect other selections. It is considered to be selected when the control box has a checkmark. In the initial state, a checkbox can switch on or off.

![Image Name](assets/3_components/checkbox/checkbox.png)

### When to use

There are two main use cases for checkboxes:

- Single: Use a stand-alone checkbox if users are to turn an option on or off. For instance, this could be a request in a form or the agreement of general terms and conditions before buying a product.
- Multiple: Use a number of checkboxes if users are to select one or more options from a list. For instance, this could be a filter panel in a shop, a collection of settings, or a list of items to edit.

### When not to use

- When states are mutually exclusive, use radio buttons instead.

## Elements

![Image Name](assets/3_components/checkbox/checkbox-elements.png)

### Checkbox deselected (1)

If there is no checkmark, a checkbox is considered to be deselected.

### Checkbox selected (2)

If a checkbox has a check mark, it is considered to be selected.

### Information (3) (Optional)

If necessary, you can also provide additional information.

### Error (4)

An error message appears if an option is mandatory but not selected, e.g., when it’s required to execute the next steps in the process.

## Checkbox label

The label explicitly describes what happens when users select or deselect a checkbox. It should convey two opposite states. Always formulate the label positively to avoid double negatives.

![Image Name](assets/3_components/checkbox/checkbox_label.png)

## Disabled state

Disable the checkbox if:

- another action has to take place before the checkbox is usable or
- the option needs to be listed but is currently unavailable.

![Image Name](assets/3_components/checkbox/checkbox_disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

![Image Name](assets/3_components/checkbox/checkbox_nesting.png)

## Required input

When checking a box is required, use an asterisk (\*) in the text label.

![Image Name](assets/3_components/checkbox/checkbox_required_input.png)

## Related components

[Checkbox Group, ](?path=/usage/components-checkbox-group--standard)
[Dropdown, ](?path=/usage/components-dropdown--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Radio Button](?path=/usage/components-radio-button--standard)
