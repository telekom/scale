<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tab Navigation</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Tabs allow users to quickly switch between different sections of a topic.

## General

Tabs help organize content into logical sections. Arrange tabs horizontally, in the best case up to 5 and not more than one row. Each tab presents related content from the same level of hierarchy. Within a set of tabs, the first tab is active by default.

### When to use

Use tabs to separate a large amount of content without having to reload the page.

When creating tabs, make sure the different sections of content are:

- related to each other,
- from the same level of hierarchy,
- clearly distinguished from one another, and
- easily understood as stand-alone content.

### When not to use

Don't use tabs if:

- users might want to compare the content,
- users need to read the content in a particular order (e.g., with processes), or
- you have the option to optimize the content and display it within one viewing element.

## Basic Types

### Text only

For most use cases, tabs with text provide the best orientation.

![Image Name](assets/3_components/tab-navigation/tab_navigation_textonly.png)

### Text and icon

Add icons if they help users understand which content a certain tab represents. Do not use the same icon more than once within a set of tabs.

![Image Name](assets/3_components/tab-navigation/tab_navigation_icon-text.png)

## Disabled tab

If the content in one tab is temporarily unavailable, you can disable the tab.
A user needs to understand why they can't access a tab, or this will lead to a less-than-ideal experience. Therefore, see if you can maintain the functionality of each tab and explain in the content area when a tab is temporarily unavailable.

![Image Name](assets/3_components/tab-navigation/tab_navigation_disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Label

The label clearly describes the content which a particular tab represents. Since short labels are more scannable, don't use more than 1-2 words.

## Best practices

- When the user switches between sections, only the tab and its content area should change – nothing else.
- Arrange the tabs according to the needs of our users.
- Don't mix different types of tabs: for one set of tabs, decide on either having icons or not.

## Related components

[Accordion, ](?path=/usage/components-accordion--standard)
[Sidebar Navigation](?path=/usage/components-sidebar-navigation--standard)
