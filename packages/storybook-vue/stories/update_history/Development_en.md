# Code Updates

This page documents updates in `@telekom/scale-components` and related packages.

## New profile menu

26.02.2024

The "Telekom Brand Header & Navigation" is complemented by the new profile menu. Users can log in and out using this menu. You can find more information in the Usage Text of the [new Brand Header](./?path=/docs/components-telekom-brand-header-navigation--standard-header).

## Visual Design Updates

21.06.2023

Minor bug fixes and optimizations of the visual design of the following components:

- Accordion
- Breadcrumb
- Button
- Checkbox Group
- Card
- Data Grid
- Date Picker
- Dropdown Select
- Footer
- Flyout Menu
- Link
- List
- Loading Spinner
- Modal
- Notification
- Radio Button Group
- Rating Stars
- Sidebar Navigation
- Switch
- Tab Navigation
- Table
- Tag
- Telekom Brand Header
- Text Area
- Text Field

**Further changes:**

The beta components Notification Banner, Messager, and Toast have been merged into a component named "Notification."

The logo variants with a claim have been removed from Scale as they are not intended for digital applications. The logo with a claim can still be downloaded via the [Brand & Design portal](https://www.brand-design.telekom.com/en/asset/logo-0-t-logo-with-claim/).

## Additional basic types of the Telekom Brand Header

20.03.2023

The beta component “Telekom Brand Header & Navigation” released in January is extended by two new basic types - “Slim Header” and “Subtle Header”. You can find more information in the Usage Text of the [new Brand Header](./?path=/docs/components-telekom-brand-header-navigation--standard).

## New Brand Footer

17.02.2023

Release of the new brand footer as a beta version. This will replace the current component once quality control is complete and WCAG accessibility certification is in place.

## New Brand Header

31.01.2023

Release of the new brand header as a beta version. This will replace the current component once quality control is complete and WCAG accessibility certification is in place. Until then, we'd love to hear <a href="https://deploy-preview-1537--marvelous-moxie-a6e2fe.netlify.app/?path=/docs/contact-your-feedback--page" target="_blank" rel="noopener noreferrer">your feedback</a> on the new component.

## New Beta Components

25.01.2023

- Release of the new beta components Segmented Button and Chip.
- The Segmented Button replaces the beta component Toggle Group.
- New category Deprecated Components. This lists components we no longer support.

<br>

## Component Update (Optimized Mobile and Visual Design)

27.10.2022

**Visual and functionality changes**

- Slider: optimized the design and expanded on the overall functionality
- Radio Buttons: optimized the selected interactive state
- Tags: optimized the current colors and added predefined colors
- Switch: revised the design and added a variant for Android
- Tab Navigation: optimized the visual design

<br>

**Optimized for touch-screen devices**

The following components have been resized to make them easier to use on touch screens:

- Radio Button
- Radio Button Group
- Checkbox
- Checkbox Group

<br>

**Removed small variants**

The following components have been adjusted in height and are now only available in one size on Scale. If you need a different size, you can change the components with CSS overwrite.

- Text Field
- Dropdown
- Dropdown Select
- Date Picker
- Pagination

We continue to support the small and large button sizes. The height of the large button was also adjusted.

<br>

**Accessibility**

Information text now contains icons to support people with color vision deficiency (often referred to as color blindness). These are the updated components:

- Text Field
- Text Area
- Dropdown
- Dropdown Select
- Radio Button
- Radio Button Group
- Checkbox
- Checkbox Group

<br>

**Sketch library**

The changes above have also been applied to our Sketch library. In addition, we’ve optimized the icons for the following components:

- Buttons
- Text Field
- Text Area
- Rating Stars
- Switch
- Dropdown
- Text List
- Table

Please note: some small variants are no longer supported or available in the library. If you use such variants, you can replace them with the new standard size by clicking Layer ➔ Replace With. Here is an overview of the removed components:

| Component       | Previous variant size | New variant name | Replaced with |
| --------------- | --------------------- | ---------------- | ------------- |
| Text Field      | Small                 | ❌               | Standard      |
|                 | Large                 | Standard         | –             |
| Dropdown        | Small                 | ❌               | Standard      |
|                 | Large                 | Standard         | –             |
| Dropdown Select | Small                 | ❌               | Standard      |
|                 | Large                 | Standard         | –             |
| Date Picker     | Small                 | ❌               | Standard      |
|                 | Large                 | Standard         | –             |
| Pagination      | Small                 | ❌               | Standard      |
|                 | Large                 | Standard         | –             |
| Table           | Small                 | Standard         | –             |
|                 | Large                 | ❌               | Standard      |

**Color tokens**

The new UI colors white and black are well suited when the color is identical in dark and light mode.

## New dropdown select beta component

02.08.22

The dropdown menu is now an integrated part and is no longer generated by the browser as in the [current version](./?path=/docs/deprecated-components-dropdown--standard). This makes the component less error-prone. In particular, errors that could occur when switching between light and dark modes are now avoided.

We aim to deprecate the [Dropdown](./?path=/docs/deprecated-components-dropdown--standard) component in favour of the newly released beta [Dropdown Select](./?path=/docs/components-dropdown-select--standard) as soon as new component gets our of the beta phase.

## Dark and light mode (`v3.0.0-beta.100`)

- The Scale components are now also available in Dark Mode
- The color palette was optimized
- The design token concept was optimized and extended by semantic tokens
- The text styles have been optimized
- CSS variables prefixed with `--scl` are deprecated in favor of the new `--telekom` ones.

Read more about <a href="https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md" target="_blank" rel="noopener noreferrer">the changes on GitHub</a>.

### Affected content

All components
[Release Notes](./?path=/docs/new-release-release-notes--page)
[Sketch Library Update](./?path=/docs/new-release-sketch-library-update--page)
[Design Tokens](./?path=/docs/guidelines-design-tokens--page)
[Typography](./?path=/docs/guidelines-typography--page)
[Colors](./?path=/docs/guidelines-colors--page)
[Shadows](./?path=/docs/guidelines-shadows--page)

## v1 to v2 Migration

Find the guide <a href="https://github.com/telekom/scale/blob/main/docs/archive/v1-to-v2-migration-guide.md" target="_blank" rel="noopener noreferrer">on GitHub</a>.
