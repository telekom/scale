# Update Sketch Library

## Update 27.10.2022

Some of our component variants have been removed (see update history). In existing layouts, the symbols will continue to appear as part of the library even if they’re no longer available. Please keep your layouts up to date by re-linking the elements with the Replace With function. Here’s how to do it:

### 1. Check your document for removed symbols

The following components are no longer supported. It's best to check if you're using one of them.

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

### 2. Replace the old symbols

Components used in Sketch are easily replaced with symbols. To do this, select the element to overwrite and click in the menu under Layer ➔ Replace With. Then select Telekom Scale Components and look for the corresponding symbol.

<img src="assets/replace-component-en.png"  />

## Dark mode release 19.04.2022

Scale now includes all components for [dark mode](./?path=/docs/guidelines-light-and-dark-mode--page). In addition, we've optimized light mode. There is a separate library for each mode. You can change the mode used at any time by replacing one library with the other.

## Important for existing projects

To take full advantage of the new features, your components and colors should be linked to the library. Especially self-defined colors remain unaffected by the update. In order to avoid unwanted effects of the update, we provide a new library with this release and ask you to briefly check your project beforehand.

Please read the following points first and only then load the new library via the button below.

## How to best prepare your project for the update

### 1. Check your layout for detached components

This is important; otherwise they can’t update via the library update. In Sketch, you can replace instances, groups, or layers with symbols from libraries. To do this, select the object you want to overwrite and then click Menu → Layer → Replace with.

<img src="assets/replace-component-en.png"  />

### 2. Make sure your elements are linked to colors from the library

By clicking on a layer and then selecting Fill and/or Border in the inspector panel, you can see whether a color is individually selected or whether it comes from the selected default library color. The correct color tokens must be applied for the library to be fully functional. [Find out more in our Design Tokens guideline](./?path=/docs/guidelines-design-tokens--page)

<img src="assets/choose-color-token-en.png"  />

## Reverting back to the previous version of the library

Download the previous version and replace the new version. In Sketch, click the notification in the top-right corner. A flyout opens with the option: Components update available. This option will revert your layout back to the previous version.

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch.rss" rel="nofollow" class="matomo_download">Telekom Scale Components</a></p>
