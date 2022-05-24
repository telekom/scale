# Update Sketch Library

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

## Add new library

> Please note that the following components make use of Telekom brand and design assets — including but not limited to the logos, the color magenta, the typeface and icons, as well as the footer and header components — and are **not open source** and **not available for free use**. They require Deutsche Telekom's express permission for use in commerce.

Have you finished checking your existing project? Then add the new Sketch library. And enjoy the new version!

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch-light.rss" rel="nofollow" class="matomo_download">Telekom Scale Components (Light)</a></p>

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch-dark.rss" rel="nofollow" class="matomo_download">Telekom Scale Components (Dark)</a></p>

## Reverting back to the previous version of the library

Download the previous version and replace the new version. In Sketch, click the notification in the top-right corner. A flyout opens with the option: Components update available. This option will revert your layout back to the previous version.

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch.rss" rel="nofollow" class="matomo_download">Telekom Scale Components</a></p>
