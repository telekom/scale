<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

A tooltip conveys additional information or definition about an element and provides assistance to users.

## General Info

Tooltips can be used on any active element, e.g. an icon, text link or button, and appear when hovering. They are not focusable and do not contain focusable content.

### When to use

- Whenever users can benefit from additional information about an element (e.g.
  regarding the element function).
- Whenever users should be given more information about an interaction (e.g. “Click
  here to copy to clipboard”).

### When not to use, whenever it convey

- edundant or obvious information.
- information (the user interface must work without a tooltip).

## Best practice

### Position tooltips appropriately

Tooltips can be added to all four edges of an element and are displayed upon hovering the
mouse over the element.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Be sure to keep consistency in your implementation so that you don't use too many different positioning and content types.

### Use tooltips for non-labelled icons and icon-only buttons.

Non-labelled icons and icon-only buttons benefit from the additional information provided via the tooltip, e.g. when an icon has a function. Always make sure that these elements are
accessible.

### Ensure a proper contrast between tooltip and background.

A tooltip must be easily distinguishable from its background to get the attention of the user.
Black on grey is not enough.

### Make sure that tooltips do not cover content they are describing.

A tooltip to a form field should for example neither cover the form field itself nor other text elements relating to it.

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.
