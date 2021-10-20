<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

A tooltip offers users additional information about an object.

## General Info

Tooltips can be added to all four edges of an element and are displayed upon hovering the
mouse over the element.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Always implement tooltips in a consistent manner.

### When to use

- Whenever users can benefit from additional information about an element (e.g.
  regarding the element function).
- Whenever users should be given more information about an interaction (e.g. “Click
  here to copy to clipboard”).

### When not to use

- Whenever it would repeat information that is already shown in the UI.
- Whenever it would contain essential information, without which users would not
  know how to proceed. Such information belongs in the UI.

## Best practice

### Use tooltips for non-labelled icons and icon-only buttons.

Non-labeled icons and icon-only buttons benefit from the additional information provided via
the tooltip, e.g. when an icon has a function. Always make sure that these elements are
accessible.

### Ensure a proper contrast between tooltip and background.

A tooltip must be easily distinguishable from its background to get the attention of the user.
Black on grey is not enough.

### Make sure that tooltips do not cover content they are describing.

A tooltip to a form field should for example neither cover the form field itself nor other text elements relating to it

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.
