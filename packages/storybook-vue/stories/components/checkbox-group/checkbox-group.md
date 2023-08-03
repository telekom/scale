<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Checkbox Group</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A checkbox group combines checkboxes with related selection options to form a group.

## General

Clicking on the parent checkbox activates or deactivates a checkbox group. By grouping the content of checkboxes and describing the group, you can present contextual relationships to users more quickly. Interfaces with many options appear smoother and tidier overall.

![Checkbox Group](assets/3_components/checkbox-group/checkbox-group.png)

### When to use

Use a checkbox group when:

- users should select one or more options from a list (e.g., filters in an online shop or a number of settings) and
- users should have the opportunity to activate or deactivate all options at the same time.

### When not to use

Don't use a checkbox group when:

- the selection options aren't closely related.

## Elements

![Elements of Checkbox Group](assets/3_components/checkbox-group/Elements.png)

#### Parent checkbox (indeterminate state) (1)

Clicking/tapping on the parent checkbox activates or deactivates the whole group. The status of this checkbox shows whether all or only some options are activated or all options are deactivated.

#### Group label (2)

Choose a short and meaningful title for the entire group.

#### Information (3) (optional)

If necessary, you can also provide additional information.

#### Child checkbox (4)

The child checkboxes can be activated or deactivated individually.

#### Label (5)

Use the label to clearly describe the effect of the respective selection. A label usually contains max three words.

#### Error message (6)

If a mandatory option isn't activated (e.g., when it's required to carry out the next step in the process), an error message appears below this checkbox.

#### Group error message (7)

If an error message affects the entire group, place it below the group label.

## Disabled state

A checkbox group or an individual checkbox is disabled if:

- users have to take another action before using the checkbox or
- the option must be listed but users can't currently select it.

The disabled state of the entire group occurs automatically when all individual checkboxes are disabled.

![A disabled checkbox group](assets/3_components/checkbox-group/checkbox-group-disabled-en.png)

![A disabled checkbox](assets/3_components/checkbox-group/checkbox-group-disabled-single-en.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Related components

[Checkbox, ](?path=/usage/components-checkbox)
[Radio Button, ](?path=/usage/components-radio-button)
[Radio Button Group](?path=/usage/components-radio-button-group)
