<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Tooltips can be used to offer additional information describing an object to the user. The description should help the user to understand the functionality ob the element.

## General

Tooltips can be added to all four edges of an element. Once the user hovers over the element with his mouse or sets the focus on the element, the tooltip gets shown.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Tooltips should be used consistently.

### When to use

- Users could use additional information describing the element.
- Users could use hints about special features of an interaction.

The usage of Tooltips in combination with buttons is very common and encouraged. In particular, icon only buttons could get additional descriptions through tooltips.

### When not to use

- Information should not be doubled in the UI. Do not add information to Tooltips, which are already present in the webpage.
- Tooltips should not be necessary to find for users. Users should be able to understand their tasks in an user interface without needing to find the Tooltip. They should be used only for one specific element.

## Best practice

### Use Tooltips for non labelled icons and buttons.

Unlabelled icons and buttons which serve a function which is not described in proper texts, can get additional descriptions through Tooltips.

### Tooltips need to have a proper contrast to its background.

A tooltip should be easily distinguishable from its background. The key for that is a proper contrast. For example a black Tooltip on a grey background would serve this purpose.

### Make sure that Tooltips do not cover contents they are describing

For example Tooltips used in forms should not cover input labels of the described input.

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.
