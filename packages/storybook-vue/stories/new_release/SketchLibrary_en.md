# Update Sketch Library

## Dark mode release 05.04.2022

Scale now includes all components for [dark mode](./?path=/docs/guidelines-light-and-dark-mode--page). In addition, we have optimized the Light Mode. There is a separate library for each mode. You can change the mode used at any time by replacing one library with the other.

## Important for existing projects

To take full advantage of the new features, your components and colors should be linked to the library. Especially self-defined colors remain unaffected by the update. In order to avoid unwanted effects caused by an automatic update of the library, we are providing a new library for this release. Please read the following points first and only then load the new library via the button below.

## How to best prepare your project for the update

### 1. Check your layout for detached components

This is important; otherwise they can’t update via the library update. In Sketch, you can replace instances, groups, or layers with symbols from libraries. To do this, select the object you want to overwrite and then click Menu → Layer → Replace with.

<img src="assets/replace-component-en.png"  />

### 2. Make sure your elements are linked to colors from the library

By clicking on a layer and then selecting Fill and/or Border in the inspector panel, you can see whether a color is individually selected or whether it comes from the selected default library color. The correct color tokens must be applied for the library to be fully functional. Find out more in our Design Tokens guideline

<img src="assets/choose-color-token-en.png"  />

## Add new library

Have you checked your existing project? Then add the new Sketch Library. Have fun with the new version. Scale Components Light Mode

<iframe src="https://www.brand-design.telekom.com/?tx_bdrss_sketchlibraryiframe[show]=2&no_cache=1"
name="SketchLibrary"
style="border: none;"
frameborder="0" marginheight="0px" marginwidth="0px" height="64px" width="100%">
</iframe>

## Reverting back to the previous version of the library

Download the previous version and replace the new version. In Sketch, click the notification in the top-right corner. A flyout opens with the option: Components update available. This option will revert your layout back to the previous version.

<iframe src="https://www.brand-design.telekom.com/?tx_bdrss_sketchlibraryiframe[show]=1&no_cache=1"
name="SketchLibrary"
style="border: none;"
frameborder="0" marginheight="0px" marginwidth="0px" height="22px" width="100%">
</iframe>
