# Light and Dark Mode

**Light and dark mode are directed at different user groups and different use cases. This is not only about aesthetics, but also about avoiding eye strain. Be it due to ambient light or, for example, visual impairments such as cataracts.**

With the help of our components, dark mode can be implemented with almost no additional effort. Both in the design and in the code.

![Dark mode example modal](assets/dark-mode-example-modal.png)

## Light mode

Most general users without visual impairments prefer light mode, especially in a well-lit environment. As such, we recommend light mode as default, unless there are special reasons not to. However, there are also exceptions, such as Magenta TV – this platform is offered exclusively in dark mode.

## Dark mode

Dark mode is especially beneficial for users with certain visual impairments, as it makes it easier to distinguish between elements and text. Some users also benefit from the lower contrast in dark mode. Most users, even without visual impairments, prefer dark mode at night and in dimly-lit environments. This helps avoid eye strain and fatigue.

## Switching modes

Each color of a component is replaced by a matching color from the other mode. This allows designers and developers to change modes with almost no additional effort.

![Dark mode example shapes](assets/dark-mode-example-shapes.png)

## An optimized color palette

We’ve optimized the Scale color palette so that it provides a consistent look and feel across both modes. Of course, all colors in our components are
certified for accessibility. To learn more, [check out an overview of the new color palette](./?path=/docs/guidelines-colors--page)

![Dark mode example palette](assets/img_color.png)

## Let your users decide

Since there are many personal reasons for choosing a mode, it’s ideal to let your users decide which mode they want to use. If you can detect user preferences from the operating system (like via `prefers-color-scheme` on the web), select the preferred mode automatically. To offer a manual change, you can offer a button or switch that toggles between light and dark mode – e.g., in the settings of your product.

## For designers

Scale allows you to design in either light or dark mode. Switching is possible at any time at the press of a button, so you can view your design in the other mode. But even without additional designs, the development team can activate the other mode.

### Sketch

- Go to <a href="./?path=/docs/setup-info-getting-started-for-designers--page">Getting Started for Designers</a> and import the libraries for light and dark mode.
- Design your interface with the library of your choice.
- To change the mode, go to Preferences > Libraries and select the other library. When asked, select "Replace". Close the preferences window.
- In Sketch, click the notification icon (bell) in the upper-right corner and select "Component updates available".
- Select "Update components".
- Now your design will appear in the other mode.

![Dark mode sketch modes](assets/dark-mode-sketch-modes-en.png)

## Information for developers

### Implementing dark mode

Dark mode is included starting with Scale version `3.0.0-beta.100`. It leverages CSS variables to allow switching modes.

By default, the mode is set to match the operating system preferences, via the `prefers-color-scheme` media query.

Alternatively, you can set the mode via the `data-mode` attribute. The value must be either `light` or `dark`. It's recommended to do this in the body, e.g. `<body data-mode="light">`, although it's also possible to only switch a specific part of the page.

Setting the `data-mode` attribute will override the system preferences.

In order to have your app switch modes entirely (not only the Scale components), use the following tokens for the canvas and text colors:

```css
body {
  background-color: var(--telekom-color-background-canvas);
  color: var(--telekom-color-text-and-icon-standard);
}
```

There are more color tokens at your disposal for different use cases. Please make sure to check our guideline on [Colors](./?path=/docs/guidelines-colors--page).

### Disabling automatic switching

If you want your app to be in either light or dark mode regardless of the user's system preferences, set the data-mode attribute to the desired mode:

```html
<body data-mode="light"></body>
```

### Changing modes manually

You can build a switch into the UI with a bit of JavaScript, to set the `data-mode` attribute accordingly. The following snippet should serve as an illustration:

```js
const element = document.querySelector('.mode-switch');

element.addEventListener('click', function switchMode() {
  const isDark = document.body.dataset.mode === 'dark';
  document.body.dataset.mode = isDark ? 'light' : 'dark';
});
```

In JavaScript, you can check and monitor the system preference via the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia" target="_blank" rel="noopener noreferrer">window.matchMedia</a> method.

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = mq.matches;
```
