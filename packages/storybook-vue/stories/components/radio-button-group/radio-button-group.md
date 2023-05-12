<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Radio Button Group</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Radio buttons allow users to choose an option from a number of
alternatives. The radio button group also contains a group label.

## General

Radio buttons only work as a group. Activating a radio button
automatically deselects the previously selected option. With a group
label, users can grasp contextual context more quickly. Interfaces with
many options appear smoother and tidier overall.

![Radio Button Group](assets/3_components/radio-button-group/radio-button-group-general.png)

### When to use

Use a radio button group to:

- offer users a range of related but mutually exclusive choices and
- to ensure clarity in the case of several groups of radio buttons.

#### When not to use

Don't use a radio button group when:

- users should select more than one option (use checkboxes instead) or
- users have to perform an action (use a button instead).

## Elements

![Elements of Radio Button Group](assets/3_components/radio-button-group/radio-button-group-elements.png)

#### Group label (1)

Choose a short and meaningful title for the entire group.

#### Selected radio button (2)

If the circle is filled in, an option is selected.

#### Label (3)

Use the label to clearly describe the effect of the respective selection. A label usually contains max three words.

#### Deselected radio button (4)

If the circle is empty, an option is deselected.

#### Information (5) (optional)

If necessary, you can also provide additional information.

#### Error message (6)

Place error messages below the group label.

## Deactivated state

Deactivate a radio button when:

- users have to complete another action before selecting the radio
  button or
- the option must be listed but users can\'t currently select it.

![Disabled Radio Button Group](assets/3_components/radio-button-group/radio-button-group-items-disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Related components

[Radio Button, ](?path=/usage/components-radio-button)
[Checkbox, ](?path=/usage/components-checkbox),
[Checkbox Group](?path=/usage/components-checkbox-group)
