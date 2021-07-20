<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Tooltips can be used to offer additional informations describing an object to the user. The description should help the user to understand the functionality ob the element.

## General
Tooltips can be added to all four edges of an element. Once the user hovers over the element with his mouse or sets the focus on the element the tooltip gets shown.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Tooltips should be used in a consistent way.

### When to use
- Users could use additional informations describing the Element.
- Users could use hints about special features of an interaction.

The usage of Tooltips in combination with buttons is very common and encouraged. In particular icon only Buttons could get additional descriptions through tooltips.

### When no to use
- Informations should not be doubled in the UI. Do not add Informations to Tooltips, which are allready present in the Webpage.
- Tooltips should not be necessary to find for Users. Users should be able to understand their tasks in an User Interface without needing to find the Tooltip. They should be used only for one specific Element.

## Best Practice

### Use Tooltips for non labeled Icons and Buttons.
Unlabeled Icons and buttons which serve a function which is not described to proper texts, can get additional descriptions through Tooltips.

### Tooltips need to have a proper contrast to its background.
A tooltip should be easily distinguishable from its background. The key for that is a proper contrast. For example an black Tooltip on a grey Background would serve this purpose.

### Make sure that Tooltips do not cover contents they are describing
For example Tooltips used in forms should not cover Input Labels of the described input.