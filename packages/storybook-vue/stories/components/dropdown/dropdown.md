<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Dropdown</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

With a dropdown, users select an option from a list.

## General

The dropdown temporarily displays a selection list. Thus, the dropdown helps save space when there are multiple options to choose from.

### When to use

Use a dropdown when users:

- can select options within a form,
- should only select one of the options, or
- should filter or sort content.

### When not to use

Don’t use dropdowns, when users:

- should only have a few options (radio buttons may be better),
- should have a lot of choices (an input field with auto-fill is more helpful),
- should have several options (use checkboxes instead), or
- should navigate (use a navigation component like the sidebar navigation).

## Basic Types

### Standard

The standard dropdown from Scale lists all available options.

![Image Name](assets/3_components/select-box/Dropdown.png)

### Option groups

If you have a lot of options to categorize, you can create groups of options.

![Image Name](assets/3_components/select-box/Dropdown-optionsgruppe.png)

## Elements

![Image Name](assets/3_components/select-box/Elemente.png)

### Label (1)

The label clearly indicates what kind of options the dropdown provides.

### Icon (2)

The direction of the arrow indicates whether the dropdown menu is open or closed.

### Information (3) (Optional)

Additional information can help clarify the content or purpose of a dropdown.

### Error (4)

If users have to select an option, submitting a form without a selection will result in an error message. If the dropdown already has an information text, the error text will temporarily take its place.

### Title (5)

The title prompts the user to select an option

### Dropdown menu (6)

The dropdown menu contains the available options or groups of options.

## Known issues

The dropdown is ready for use. The component in disabled state is displayed incorrectly with white background in Firefox 85.0.2 (64-bit) in HCM (high contrast mode).
The display error is on the browser side.

## Related components

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Radio Button](?path=/usage/components-radio-button--standard)
