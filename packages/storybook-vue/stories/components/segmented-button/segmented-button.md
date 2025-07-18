<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Segmented Button</h1>
</div>

Segmented buttons make it easier for users to filter content, select options, or change views.

## General

A segmented button can consist of two to five selection options, where the options always belong to a common category. Selecting both single and multiple options is possible.

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Only_1.png)

### When to use

Use a segmented button to:

- display selected filters,
- offer functions like sorting content or changing views, or
- provide input options.

### When not to use

Don’t use a segmented button when:

- there are more than five selection options,
- the options are not logically related,
- actions should be triggered (e.g., editing, adding, or deleting), or
- the view should switch between separate content (use tabs instead).

## Basic types

### Single selection

![Image Name](assets/3_components/segmented-button/SegmentedButton-Single_Select.png)

As with the Radio Button Group, users can only select one option. One option is always preselected. If necessary, specify a neutral option – for example "All" to override the set filters.

### Multiple selection

![Image Name](assets/3_components/segmented-button/SegmentedButton-Multiselect.png)

As with Check Box Groups, users can also select multiple options. Multiple selections are typically used to filter content.

## Variants

### Text only

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Only_1.png)

A text that describes the option is ideal for most use cases. In the selected state, add a checkmark icon to the segmented button.

### Icon and text

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Icon.png)

Add appropriate icons to clarify options (optional). In the selected state, a checkmark icon replaces the previously displayed icon.

### Icon only

![Image Name](assets/3_components/segmented-button/Icon_Only.png)

If the icon clearly refers to the action, you can omit the text. In this case, set an aria-label for the screen reader.
By default, icons are used in the outline variant. Flat icons indicate a selected status.

## Sizes

![Image Name](assets/3_components/segmented-button/SegmentedButton-Sizes.png)

Segmented buttons are available in three different sizes:

- Small
- Medium
- Large

The segment with the longest label dictates the width of all segments. If necessary, you can switch the segmented button to the full width of the area

## Disabled state

![Image Name](assets/3_components/segmented-button/SegmentedButton-Disabled.png)

If an interaction is temporarily unavailable, you can deactivate the entire component or just individual segments of the segmented button.

## Elements

![Image Name](assets/3_components/segmented-button/SegmentedButton-Elements-2.png)

### Group label (1) (optional)

Choose a short descriptive title for the whole group (for example, "Sort by" or "Distance").

### Container (2)

The container visually summarizes all the options or fields of a segmented button into a group.

### Segment (3)

Each selection is represented as a segment. With a multiple selection, group adjacent selected segments together.

### Icon (4) (optional)

The icon either supports the label to illustrate the content or replaces the text as a standalone variant.

### Label (5)

The label describes individual choices and should be short and precise.

## Best practice

- Don’t mix variants: text only, text and icon, or icon only.
- Use short and clear labels.
- Offer a neutral option, for example to disable filters and sorting.
- Use the full width option on mobile devices and make sure the total width doesn't exceed the smallest display size (320 px).

## Examples

![Image Name](assets/3_components/segmented-button/SegmentedButton-Filter-list.png)

![Image Name](assets/3_components/segmented-button/SegmentedButton-SortBy-Price.png)

![Image Name](assets/3_components/segmented-button/Map.png)

## Related components

[Tab Navigation](?path=/usage/components-tab-navigation--text-icon),
[Button](?path=/usage/components-button--standard),
[Radio Button Group](?path=/usage/components-radio-button-group--standard),
[Checkbox Group](?path=/usage/components-checkbox-group--standard),
[Chip](?path=/usage/components-chip--standard),
[Icon Button](?path=/usage/components-button--icon-only)
