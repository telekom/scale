<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Notification (DRAFT)</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Component to communicate updates or information related to a process, action.

## General

A notification can be used to display feedback, messages or information. There are three types of notifications: Inline, Banners, and Toasts. Each of them is intended for different cases.

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.

### When to use

- Banner: for displaying system information or information about a page
- Message: for displaying messages and information related to specific content
- Toast: for displaying feedback regarding an action

### When not to use

- the contents and actions are already self-explanatory

## Basic Types

- Inline
- Banner
- Toast

### Inline

The Inline type can be used to output a message or information. This type of notification relates to its context and appears inline for example within a form or at the top of the content area.

### Banner

The Banner type can be used to display a message/notification/information concerning the page or the system. This higher-level information is displayed between the brand header and the content area. A banner does not necessarily has to be placed on the grid and can be positioned absolute.

### Toast

The Toast type can be used to issue quick and non-disruptive feedback or notifications regarding an action. It is placed above the content and can be positioned on each corner of the viewport. The exact position can also be adjusted.

## Variants (States?)

- informational
- warning
- success
- danger

## Behavior

### Auto-hide

Notifications can be automatically removed after a predefined timeframe runs out. The timeframe can be set within the component properties (`delay` prop).

## Elements

- Background
- Notification Icon
- Text
- Close Icon (If dismissible)

### Optional elements (Slots)

#### With Text

In addition, a short explanatory text can be added to it.
