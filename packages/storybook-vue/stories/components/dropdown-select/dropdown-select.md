<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Dropdown Select</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

With a dropdown, users select a single option from a collapsible list of available options.

## General

The dropdown temporarily displays a selection list. Thus, the dropdown helps save space when there are multiple options to choose from.

![Image Name](assets/3_components/dropdown-select/dropdown-select.png)

### When to use

Use a dropdown when users:

- can select options within a form,
- should only select one of the options, or
- should filter or sort content.

### When not to use

Don’t use dropdowns, when users:

- should only have a few options (radio buttons may be better and they do not hide the content from the user),
- should have a lot of choices (an input field with auto-fill is more helpful and time saving for the user),
- should have several selectable options (use checkboxes instead), or
- should navigate (use a navigation component like the sidebar navigation).

## Elements

![Image Name](assets/3_components/dropdown-select/Elements.png)

### Label (1)

The label clearly indicates what kind of options the dropdown provides.

### Icon (2)

The direction of the arrow indicates whether the dropdown menu is open or closed.

### Information (3) (Optional)

Additional information can help clarify the content or purpose of a dropdown.

### Error (4)

If users have to select an option, submitting a form without a selection will result in an error message. If the dropdown already has an informational text, the error text will temporarily take its place.

### Label and Value (5)

When a Value from the dropdown is selected, it takes the place of the Label and the Label collapses into a smaller size.

### Dropdown menu (6)

The dropdown menu contains the available options or groups of options.

## Deactivated state

Deactivate a dropdown select item when:

- users have to complete another action before selecting the
  dropdown select item or
- the option must be listed but users can\'t currently select it.

![Disabled Dropdown Select](assets/3_components/dropdown-select/dropdown-select-items-disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Related components

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Radio Button](?path=/usage/components-radio-button--standard)
[Date Picker](?path=/usage/components-date-picker--standard)
