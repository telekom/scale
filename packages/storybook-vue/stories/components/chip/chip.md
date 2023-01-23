<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Chip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Chips are contextual components that allow users to filter content or trigger actions.

## General

Chips consist of relevant keywords in a container. They often appear dynamically (triggered by a user action) and as a group.

### When to use

Use chips to:

- give users filtering possibilities,
- display the filters users set, or
- suggest options to users (search criteria, possible answers).

### When not to use

Don’t use chips when:

- you want to mark a category (use tags instead) or
- you can use a button instead.

## Basic types

![Image Name](assets/3_components/chip/Chips-Types.png)

### Persistent chips

Persistent chips are an integral part of the UI and can be selected and deselected.

![Image Name](assets/3_components/chip/Chips-Persistent-Default.png)

**Example 1 – Default** <br/>
A group of filter options as an integral part of the UI.

![Image Name](assets/3_components/chip/Chips-Persistent-Selected.png)

**Example 1 – Filter selected** <br/>
Users can recognize selected filters with the checkmark icon.

### Dynamic chips

Dynamic chips fade in or out after a user action.

![Image Name](assets/3_components/chip/Chips-Dynamic-Example1.png)

**Example 1** <br/>
The chip appears after users set a filter. Clicking/tapping on the close icon hides it again and resets the filter.

![Image Name](assets/3_components/chip/Chips-Dynamic-Example_Chatbot2.png)

**Example 2** <br/>
A set of possible responses in a chat. After clicking/tapping on the chip, it fades out again.

## Variants

<table> <tr><th>![Image Name](assets/3_components/chip/Chips-Variant-Outline.png)</th><th>![Image Name](assets/3_components/chip/Chips-Variant-Standard.png)</th></tr></table>

Chips can be displayed in two variants: standard and outline.

### Disabled state

<table> <tr><th>![Image Name](assets/3_components/chip/Chips-Disabled-Outline-EN.png)</th><th>![Image Name](assets/3_components/chip/Chips-Disabled-Standard-EN.png)</th></tr></table>

In the disabled state, the chip's interactive function is switched off. Use this state when an interaction can’t occur due to permissions or dependencies.

### Element

![Image Name](assets/3_components/chip/Chips-elements.png)

#### Label (1)

The label of the chip should be short and easily understandable.

#### Checkmark icon (2)

Depending on the type, the close icon or checkmark icon is displayed.

#### Icon (3) (optional)

Add an icon if it makes it easier for users to understand the function of the chip.

## Best Practices

### Chips in groups

- Arrange chips horizontally or vertically.
- Vertical layouts are suitable, for example, for a side menu that should integrate groups of chips.
- Chips arranged horizontally are often located above the content they refer to.
- Word the label as precisely as possible.

## Related components

Tag, Button, Segmented Button, Checkbox Group
